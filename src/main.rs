// extern crate serde_derive;
use std::convert::TryFrom;
use std::{ error };
use std::thread::JoinHandle;
use serde::ser::{Serialize as CSerialize, Serializer as CSerializer, SerializeStruct as CSerializeStruct};
extern crate clap;
use clap::{Arg as ClapArg, App as ClapApp};
use std::time::Duration;
extern crate serde_json;
use std::io::{Read, BufReader,BufRead};
use serde::{Serialize, Deserialize};
use std::fs::File;
use std::collections::HashMap;
use serde_json::{ Value as JValue, Map as JMap };
use std::sync::mpsc::{Sender, Receiver, RecvTimeoutError};
use std::sync::mpsc;
use std::thread;
use web_view::*;

#[derive(Serialize, Deserialize, Debug)]
struct RequestStart {
    name: String,
    count: u64,
}


#[derive(Serialize, Deserialize, Debug)]
struct RequestExit {
    status: i32,
}


#[derive(Serialize, Deserialize, Debug)]
struct RequestContinue {
    name: String,
}


#[derive(Debug)]
struct RequestOut {
    descriptor: u64,
    data: String,
}


#[derive(Debug)]
enum StartingMessage<'a> {
    RequestContinue(&'a RequestContinue),
    RequestStart(&'a RequestStart),
}


#[derive(Debug)]
enum Message {
    RequestContinue(RequestContinue),
    RequestStart(RequestStart),
    RequestStreamList,
    RequestParams,
    RequestExit(RequestExit),
    RequestOut(RequestOut),
}


#[derive(Debug)]
struct StreamError { name: String, error: String }


#[derive(Debug)]
struct StreamList { streams: Vec<String> }


#[derive(Debug)]
struct StreamLine { name: String, data: String }


#[derive(Debug)]
struct StreamPaused { name: String }


#[derive(Debug)]
struct StreamFinished { name: String }


#[derive(Debug)]
struct Params { params: Vec<Param> }


#[derive(Debug)]
struct MessageError { error: String }


#[derive(Debug, Serialize)]
struct StreamDetailsDetails { rewindable: bool }


#[derive(Debug)]
struct StreamDetails { name: String, details: StreamDetailsDetails }


impl CSerialize for StreamLine {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamLine", 3)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("data", &self.data)?;
        state.serialize_field("type", &"line")?;
        state.end()
    }
}


impl CSerialize for StreamPaused {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamPaused", 2)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("type", &"paused")?;
        state.end()
    }
}


impl CSerialize for StreamFinished {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamFinished", 2)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("type", &"finished")?;
        state.end()
    }
}


impl CSerialize for Params {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("Params", 2)?;
        state.serialize_field("params", &self.params)?;
        state.serialize_field("type", &"params")?;
        state.end()
    }
}


impl CSerialize for Param {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("Param", 2)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("value", &self.value)?;
        state.end()
    }
}


impl CSerialize for StreamDetails {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamDetails", 3)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("details", &self.details)?;
        state.serialize_field("type", &"details")?;
        state.end()
    }
}


impl CSerialize for StreamList {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamList", 2)?;
        state.serialize_field("streams", &self.streams)?;
        state.serialize_field("type", &"streamList")?;
        state.end()
    }
}


impl CSerialize for MessageError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("MessageError", 2)?;
        state.serialize_field("error", &self.error)?;
        state.serialize_field("type", &"messageError")?;
        state.end()
    }
}


impl CSerialize for StreamError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: CSerializer,
    {
        let mut state = serializer.serialize_struct("StreamError", 3)?;
        state.serialize_field("name", &self.name)?;
        state.serialize_field("error", &self.error)?;
        state.serialize_field("type", &"error")?;
        state.end()
    }
}


#[derive(Debug,Serialize)]
enum Response {
    StreamLine(StreamLine),
    StreamList(StreamList),
    StreamPaused(StreamPaused),
    MessageError(MessageError),
    StreamFinished(StreamFinished),
    Params(Params),
    StreamDetails(StreamDetails),
    StreamError(StreamError),
}

// < eventParams({'this_is_stdin': '["Name"]', 'lookups': '["First Name"]'})
// < eventStreamDetails({'this_is_stdin': 0, 'lookups': 1})
// < eventStreamLine('this_is_stdin', 'Name,Age')
// < eventStreamPaused('this_is_stdin')
// < eventStreamFinish('this_is_stdin')

const STREAM_START_CONTINUE: usize = 1;
const STREAM_EXIT: usize = 2;

struct PendingCommChannel { filename: String }

#[derive(Debug)]
struct StartedCommChannel {
    thread: JoinHandle<()>,
    tx: Sender<usize>,
    rx: Receiver<String>,
}

enum CommChannel {
    Finished,
    Started(StartedCommChannel),
    Pending(PendingCommChannel),
}

type Channels = HashMap<String, CommChannel>;

#[derive(Debug)]
struct Runner { name: String, channel: StartedCommChannel, }

#[derive(Debug,Clone)]
struct Param { name: String, value: String, }

#[derive(Debug)]
struct Opts {
    debug: u64,
    code: String,
    stream: HashMap<String, String>,
    param: Vec<Param>,
}

const ERROR_RESPONSE_STREAM_NOT_FOUND: &str = "ERROR 1: Unknown Stream: Stream not available, still running or finished.";
const ERROR_RESPONSE_UNKNOWN_MESSAGE: &str = "ERROR 2: Unknown Message: ";
const ERROR_STDERR_COULD_NOT_SEND_TO_BROWSER: &str = "ERROR 3: Could not send to browser: ";
const ERROR_STDERR_COULD_NOT_READ_MESSAGE_FROM_INPUT_READER_THREAD: &str = "ERROR 4: Could not read message from input reader thread: ";
const ERROR_STDERR_COULD_NOT_DECODE_RESPONSE: &str = "ERROR 5: Could not decode a response: ";
const ERROR_STDERR_COULD_NOT_REQUEST_STOP_FROM_INPUT_READER_THREAD: &str = "ERROR 6: Error sending exit to file reader thread: ";
const ERROR_STDERR_ONLY_STDIN_AND_STDERR_SUPPORTED_AS_OUTPUTS: &str = "ERROR 7: Only STDIN and STDERR are supported as outputs";

fn convert(s: &str) -> Option<Message> {

    let des: JValue = match serde_json::from_str(s) {
        Ok(v) => v,
        Err(_e) => {
            serde_json::from_str("{}").unwrap()
        }
    };

    fn ji32(m: &JMap<String, JValue>, s: &str) -> Option<i32> {
        match m.get(s) {
            None => None,
            Some(v) => {
                let sixty_four = v.as_i64()?;
                i32::try_from(sixty_four).ok()
            }
        }
    }

    fn ju64(m: &JMap<String, JValue>, s: &str) -> Option<u64> {
        match m.get(s) {
            None => None,
            Some(v) => {
                v.as_u64()
            }
        }
    }

    fn jstr<'a>(m: &'a JMap<String, JValue>, s: &str) -> Option<&'a str> {
        match m.get(s) {
            None => None,
            Some(v) => {
                v.as_str()
            }
        }
    }

    let o = des.as_object()?;

    match (jstr(o, "msg"), ju64(o, "descriptor"), jstr(o, "data"), jstr(o, "name"), ju64(o, "count"), ji32(o, "status")) {
        (Some("params"), None, None, None, None, None) => {
            Some(Message::RequestParams)
        }
        (Some("streamList"), None, None, None, None, None) => {
            Some(Message::RequestStreamList)
        }
        (Some("out"), Some(descriptor), Some(data), None, None, None) => {
            Some(Message::RequestOut(RequestOut { descriptor, data: data.to_owned() }))
        }
        (Some("exit"), None, None, None, None, Some(status)) => {
            Some(Message::RequestExit(RequestExit { status }))
        }
        (Some("streamStart"), None, None, Some(name), Some(count), None) => {
            Some(Message::RequestStart(RequestStart { name: name.to_owned(), count}))
        }
        (Some("streamContinue"), None, None, Some(name), None, None) => {
            Some(Message::RequestContinue(RequestContinue { name: name.to_owned() }))
        }
        _ => None
    }

}


fn get_reader(name: &str) -> std::io::Result<Box<dyn Read>> {
    match name {
        "-" => Result::Ok(Box::new(std::io::stdin())),
        name => {
            let f = File::open(&name)?;
            Result::Ok(Box::new(f))
        },
    }
}



fn stream(filename: String, pause_at: u64) -> StartedCommChannel {

    let (tx, rx): (Sender<String>, Receiver<String>) = mpsc::channel();
    let (cont_tx, cont_rx): (Sender<usize>, Receiver<usize>) = mpsc::channel();
    let thread_tx = tx.clone();

    fn terrible_error<E>(thread_tx: &Sender<String>, e: E)
        where E: error::Error
    {
        match thread_tx.send(format!("e {}", e)) {
            Err(ee) => {
                eprintln!("Error communicating between threads {:?}", ee);
                eprintln!("Underlying Error {:?}", e);
                panic!("Program Halted");
            }
            Ok(_x) => {}
        }
    }

    let thread = thread::spawn(move || {

        match cont_rx.recv() {
            Err(e) => {
                return terrible_error(&thread_tx, e)
            },
            Ok(STREAM_EXIT) => {
                return;
            }
            _ => {} // STREAM_CONTINUE or STREAM_START
        }

        let br = match get_reader(&filename) {
            Ok(f) => BufReader::new(f),
            Err(e) => {
                return terrible_error(&thread_tx, e)
            }
        };

        let mut c = 0;
        for l in br.lines() {
            match thread_tx.send(format!("i {}", l.unwrap())) {
                Err(e) => {
                    return terrible_error(&thread_tx, e)
                },
                Ok(_x) => ()
            }
            c = c + 1;

            if c >= pause_at {
                c = 0;
                thread_tx.send("p".to_owned()).unwrap();
                match cont_rx.recv() {
                    Err(e) => {
                        return terrible_error(&thread_tx, e)
                    },
                    Ok(STREAM_EXIT) => {
                        return;
                    }
                    _ => {} // STREAM_CONTINUE or STREAM_START
                }
            }

            match cont_rx.try_recv() {
                Ok(STREAM_EXIT) => {
                    return;
                }
                _ => {} // STREAM_CONTINUE or STREAM_START
            }
        }
        thread_tx.send("f".to_owned()).unwrap();
    });

    StartedCommChannel {
        thread,
        tx: cont_tx,
        rx
    }

}

fn get_opts() -> Opts {

    let matches = ClapApp::new("pipowser")
        .version("0.0.0")
        .author("Matthew Forrester")
        .about("Puts the power of the  browser into pipes.")
        .arg(ClapArg::with_name("code")
            .help("The HTML / CSS / JS to display / process the data")
            .required(true)
            .takes_value(true)
            .short("c")
            .long("code")
            .value_name("CODE")
            .env("PIPOWSWER_CODE")
        )
        .arg(ClapArg::with_name("stream")
            .help("The stream files to process. Use \"-\" for STDIN")
            // .required(true)
            .takes_value(true)
            .short("s")
            .long("stream")
            .multiple(true)
            .value_name("STREAM")
        )
        .arg(ClapArg::with_name("param")
            .help("Sets a parameter which is retrievable in the web view")
            .takes_value(true)
            .short("p")
            .long("param")
            .multiple(true)
            .value_name("PARAM")
        )
        .arg(ClapArg::with_name("debug")
            .short("v")
            .multiple(true)
            .help("Sets the level of debug")
        ).get_matches();

    Opts {
        debug: matches.occurrences_of("debug"),
        code: match matches.value_of("code") {
            None => "".to_owned(),
            Some(s) => s.to_string(),
        },
        param: match matches.values_of("param") {
            None => vec![],
            Some(vs) => {
                let mut r = vec![];
                for v in vs {
                    let chunks:Vec<&str> = v.splitn(2, "=").collect();
                    match chunks.as_slice() {
                        [k, v] => r.push(Param { name: k.to_string(), value: v.to_string() }),
                        [k] => r.push(Param { name: k.to_string(), value: "".to_string() }),
                        _ => (),
                    }
                }
                r
            }
        },
        stream: match matches.values_of("stream") {
            None => {
                HashMap::new()
            },
            Some(vs) => {
                let mut hm: HashMap<String,String> = HashMap::new();
                for v in vs {
                    let chunks:Vec<_> = v.splitn(2, "=").collect();
                    match chunks.as_slice() {
                        [k, v] => hm.insert(k.to_string(), v.to_string()),
                        [_x] => None,
                        _ => None,
                    };
                }
                hm
            }
        }
    }

}

fn validate_opts(o: &Opts) -> Option<String> {

    if o.code == "" {
        return Option::Some("No code location specified".to_owned());
    }

    if o.stream.len() == 0 {
        return Option::Some("You must stream data from somewhere".to_owned());
    }

    Option::None
}


fn start_comm_channel(msg: &StartingMessage, channels: &mut Channels) -> bool {
    match msg {
        StartingMessage::RequestStart(request) => {
            channels.get_mut(&request.name).map(|val| {
                match val {
                    CommChannel::Pending(pcc) => {
                        *val = CommChannel::Started(
                            stream(pcc.filename.to_string(), request.count)
                        );
                        true
                    },
                    CommChannel::Started(_scc) => false,
                    CommChannel::Finished => false,
                }
            }).is_some()
        }
        StartingMessage::RequestContinue(request) => {
            match channels.get(&request.name) {
                Some(CommChannel::Pending(_pcc)) => true,
                Some(CommChannel::Started(_scc)) => true,
                Some(CommChannel::Finished) => false,
                None => false,
            }
        }
    }
}


fn manage_stream<S>(send: &mut S, channel: &StartedCommChannel, name: &str) -> bool
    where S: FnMut(Response)
{

    &channel.tx.send(STREAM_START_CONTINUE);

    let mut done = false;
    let mut finished = false;

    while !done {

        done = true;

        let tmp = &channel.rx.recv_timeout(Duration::from_millis(5));
        let chunks = match tmp {
            Err(RecvTimeoutError::Timeout) => {
                vec!["p"]
            }
            Err(RecvTimeoutError::Disconnected) => {
                vec!["e", "Channel Disconnected"]
            }
            Ok(o) => {
                let chunks:Vec<_> = o.splitn(2, " ").collect();
                chunks
            }
        };

        match chunks.as_slice() {
            ["i", line] => {
                done = false;
                send(Response::StreamLine(StreamLine {
                    name: name.to_owned(),
                    data: line.to_string(),
                }));
            }
            ["e", error] => {
                send(Response::StreamError(StreamError {
                    name: name.to_owned(),
                    error: error.to_string()
                }));
                finished = true;
                break;
            },
            ["f"] => {
                send(Response::StreamFinished(StreamFinished { name: name.to_string() }));
                finished = true;
                break;
            },
            ["p"] => {
                send(Response::StreamPaused(StreamPaused { name: name.to_string() }));
                break;
            },
            _ => {
                finished = true;
                eprintln!("{}{:?}", ERROR_STDERR_COULD_NOT_READ_MESSAGE_FROM_INPUT_READER_THREAD, chunks)
            }
        }
    }

    finished

}

#[derive(Debug)]
struct GetStreamName {
    stream_name: Option<String>,
    response: Option<Response>,
    request: Option<Message>,
}

fn get_stream_to_manage(msg_str: &str, opts: &Opts, mut channels: &mut Channels) -> GetStreamName {
    match convert(msg_str) {
        None => {
            GetStreamName {
                stream_name: Option::None,
                response: Option::Some(Response::MessageError(MessageError {
                    error: format!("{}{}", ERROR_RESPONSE_UNKNOWN_MESSAGE, msg_str)
                })),
                request: Option::None,
            }
        },
        Some(msg) => {

            let no_stream = |s: String| {
                Response::StreamError(StreamError {
                    name: s,
                    error: ERROR_RESPONSE_STREAM_NOT_FOUND.to_owned()
                })
            };

            match &msg {
                Message::RequestStart(request) => {

                    match start_comm_channel(&StartingMessage::RequestStart(&request), &mut channels) {
                        false => {
                            GetStreamName {
                                stream_name: Option::None,
                                response: Option::Some(no_stream(request.name.to_string())),
                                request: Option::Some(msg),
                            }
                        },
                        true => {
                            GetStreamName {
                                stream_name: Option::Some(request.name.to_string()),
                                response: Option::Some(Response::StreamDetails(StreamDetails {
                                    name: request.name.to_string(),
                                    details: StreamDetailsDetails {
                                        rewindable: false
                                    }
                                })),
                                request: Option::Some(msg),
                            }
                        },
                    }
                },
                Message::RequestContinue(request) => {

                    match start_comm_channel(&StartingMessage::RequestContinue(&request), &mut channels) {
                        false => {
                            GetStreamName {
                                stream_name: Option::None,
                                response: Option::Some(no_stream(request.name.to_string())),
                                request: Option::Some(msg),
                            }
                        },
                        true => {
                            GetStreamName {
                                stream_name: Option::Some(request.name.to_string()),
                                response: Option::None,
                                request: Option::Some(msg),
                            }
                        }
                    }

                },
                Message::RequestOut(o) => {
                    match &o.descriptor {
                        1 => println!("{}", &o.data),
                        2 => eprintln!("{}", &o.data),
                        _ => eprintln!("{}", ERROR_STDERR_ONLY_STDIN_AND_STDERR_SUPPORTED_AS_OUTPUTS)
                    };
                    GetStreamName {
                        stream_name: Option::None,
                        response: Option::None,
                        request: Option::Some(msg),
                    }
                },
                Message::RequestStreamList => {
                    GetStreamName {
                        stream_name: Option::None,
                        response: Option::Some(
                            Response::StreamList(
                                StreamList {
                                    streams: opts.stream.keys().map(|k| {
                                        k.to_string()
                                    }).collect()
                                }
                            )
                        ),
                        request: Option::Some(msg),
                    }
                }
                Message::RequestParams => {
                    GetStreamName {
                        stream_name: Option::None,
                        response: Option::Some(Response::Params(Params { params: opts.param.clone() })),
                        request: Option::Some(msg),
                    }
                }
                Message::RequestExit(_o) => {
                    GetStreamName {
                        stream_name: Option::None,
                        response: Option::None,
                        request: Option::Some(msg),
                    }
                }
            }

        }
    }
}

fn main() {

    let opts = get_opts();

    match validate_opts(&opts) {
        Some(msg) => {
            eprintln!("{}", msg);
            std::process::exit(1);
        }
        None => ()
    }

    if opts.debug > 0 {
        eprintln!("OPTS: {:?}", opts);
    }


    fn get_view(filename: &str) -> std::io::Result<String>  {
        let mut r = get_reader(&filename)?;
        let mut b = String::new();
        r.read_to_string(&mut b)?;
        Result::Ok(b)
    }


    let html_content = match get_view(&opts.code) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("Error getting code from file \"{}\"\n\n{}", opts.code, e);
            std::process::exit(1);
        }
    };


    let mut channels: Channels = HashMap::new();

    for strm in opts.stream.iter() {
        channels.insert(
            strm.0.to_string(),
            CommChannel::Pending(PendingCommChannel { filename: strm.1.to_string() })
        );
    }

    let res_exit = web_view::builder()
        .title("WV Linewise")
        .content(Content::Html(html_content))
        // .size(800, 600)
        // .resizable(true)
        .debug(true)
        .user_data(0)
        .invoke_handler(|wv: &mut WebView<i32>, msg_str: &str| {

            if opts.debug > 0 {
                eprintln!("RECIEVED: {}", msg_str);
            }

            let mut send = |r: Response| {
                let to_eval = match &r {
                    Response::StreamList(s) => serde_json::to_string(&s),
                    Response::StreamLine(s) => serde_json::to_string(&s),
                    Response::StreamFinished(s) => serde_json::to_string(&s),
                    Response::StreamPaused(s) => serde_json::to_string(&s),
                    Response::MessageError(s) => serde_json::to_string(&s),
                    Response::Params(s) => serde_json::to_string(&s),
                    Response::StreamDetails(s) => serde_json::to_string(&s),
                    Response::StreamError(s) => serde_json::to_string(&s),
                };

                match to_eval {
                    Ok(s) => {
                        if opts.debug > 0 {
                            eprintln!("SENDING:  {}", &s)
                        }
                        match wv.eval(&format!("_globalWvLinewise({})", s)) {
                            Ok(_) => (),
                            Err(e) => {
                                eprintln!("{}{:?}{}", ERROR_STDERR_COULD_NOT_SEND_TO_BROWSER, &r, e);
                            }
                        };
                    },
                    Err(e) => {
                        eprintln!("{}{:?}{}", ERROR_STDERR_COULD_NOT_DECODE_RESPONSE, &r, e);
                    }
                }

            };

            let stream_to_manage = get_stream_to_manage(&msg_str, &opts, &mut channels);

            let must_exit = match stream_to_manage.request {
                None => None,
                Some(Message::RequestExit(o)) => Some(o),
                Some(_) => None,
            };

            if must_exit.is_some() {
                *wv.user_data_mut() = must_exit.unwrap_or(RequestExit { status: -1 }).status;
                wv.exit();
                return Result::Ok(());
            }

            match stream_to_manage.response {
                Some(r) => send(r),
                None => ()
            }

            match stream_to_manage.stream_name {
                None => Result::Ok(()),
                Some(name) => {
                    match channels.get(&name) {
                        Some(CommChannel::Started(c)) => {
                            if manage_stream(&mut send, c, &name) {
                                channels.insert(name.to_owned(), CommChannel::Finished);
                            }
                            Result::Ok(())
                        },
                        _ => Result::Err(web_view::Error::UninitializedField("Huh?")),
                    }
                }
            }

        })
        .run()
        .unwrap();

    for (k, c) in channels.drain() {
        match c {
            CommChannel::Started(scc) => {
                if scc.tx.send(STREAM_EXIT).is_err() {
                    eprintln!("{} {}", ERROR_STDERR_COULD_NOT_REQUEST_STOP_FROM_INPUT_READER_THREAD, k);
                };
            },
            CommChannel::Pending(_pcc) => (),
            CommChannel::Finished => (),
        }
        // c.thread.join();
    }

    std::process::exit(res_exit);

}
