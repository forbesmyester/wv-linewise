import React from 'react';
import './App.css';
import { AppProps, FieldStats, TypeMatches, TypeName, MODE } from "./Types";

function twoDecimalPlaces(n: number): string {
  return "" + (Math.round(n * 100) / 100)
}

function typeMatchesToString(typeMatchesToTypeNameBound: (typeMatches: TypeMatches) => TypeName[], typeMatches: TypeMatches): string {
  if (typeMatches === 0) {
    return "NO MATCH";
  }
  return typeMatchesToTypeNameBound(typeMatches).join(" & ")
}

function getStatsInfo(typeMatchesToTypeNameBound: (typeMatches: TypeMatches) => TypeName[], total: number, key: TypeMatches, val: number) {
  const percent = ((val / total) * 100);
  return {
    percent,
    tooltip: twoDecimalPlaces(percent) + "% " + typeMatchesToString(typeMatchesToTypeNameBound, key)
  };
}

export function statsDetail(colorScale: (i: number) => string, typeMatchesToTypeNameBound: (typeMatches: TypeMatches) => TypeName[], stats: FieldStats) {
  let total = stats.reduce((acc, val) => acc + val, 0);
  let rows: JSX.Element[] = stats.toArray().reduce(
    (rowAcc: JSX.Element[], [key, val]) => {
      const { percent, tooltip } = getStatsInfo(typeMatchesToTypeNameBound, total, key, val);
      const style = {
        width: "" + percent + "%",
        backgroundColor: colorScale(key)
      };
      return [...rowAcc,
        (
        <tr className="stats-detail-row-data" key={ typeMatchesToString(typeMatchesToTypeNameBound, key) }>
          <td>{ typeMatchesToString(typeMatchesToTypeNameBound, key) }</td>
          <td>{ val } ({ twoDecimalPlaces(percent) }%)</td>
        </tr>
        ),
        (
        <tr className="stats-detail-row-graph" key={ "c-" + typeMatchesToString(typeMatchesToTypeNameBound, key) }>
          <td colSpan={2}>
            <div className="bar bar-sm">
              <div
                key={ typeMatchesToString(typeMatchesToTypeNameBound, key) }
                className="bar-item tooltip"
                data-tooltip={tooltip} style={style}></div>
            </div>
          </td>
        </tr>
        )
      ];
    },
    []
  );
  return (
    <div className="stats-detail">
      <table>
        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
  );
}

export function statsBar(colorScale: (i: number) => string, typeMatchesToTypeNameBound: (typeMatches: TypeMatches) => TypeName[], stats: FieldStats) {
  let total = stats.reduce((acc, val) => acc + val, 0);
  let divs = stats.toArray().map(([key, val]) => {
    const { percent, tooltip } = getStatsInfo(typeMatchesToTypeNameBound, total, key, val);
    const style = {
      width: "" + percent + "%",
      backgroundColor: colorScale(key)
    };
    return (
      <div
        key={ typeMatchesToString(typeMatchesToTypeNameBound, key) }
        className="bar-item tooltip"
        data-tooltip={tooltip} style={style}></div>
    );
  });
  return (
    <div className="bar bar-sm">{ divs }</div>
  );
}

export default function App({ showingHelp, continuousMode, showingFieldDetails, loading, finished, header, records, events: { toggleContinuousMode, onClickTableHeading, help, exit, scroll }, deps: {  typeMatchesToTypeNameBound, colorScale } }: AppProps): React.ReactElement<AppProps> {

  const headercells = (
    header.map((h, i) => (
      <th className="field" key={i} onClick={ () => onClickTableHeading(h.name) }>
        <div>{h.name}</div>
        { statsBar(colorScale, typeMatchesToTypeNameBound, h.stats) }
      </th>
      )
    )
  );

  const rows = records.map((record) => {
    return (
      <tr key={ record.key }>
        { record.values.map(({ value }, i) => (<td key={i}>{ value }</td>)) }
      </tr>
    );
  });


  function getFieldDetails() {
    let toShow = header.filter(({name}) => name === showingFieldDetails);
    if (toShow.length === 0) {
      return (<span></span>)
    }

    return (
      <div className="modal active">
        <a href="#close" className="modal-overlay" aria-label="Close" onClick={ () => onClickTableHeading(false) }>✕</a>
        <div className="modal-container">
          <div className="modal-header">
            <div className="modal-title h5">{ toShow[0].name }</div>
          </div>
          <div className="modal-body">
            <div className="content">
              {
                statsDetail(
                  colorScale,
                  typeMatchesToTypeNameBound,
                  toShow[0].stats
                )
              }
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-link" aria-label="Close" onClick={ () => onClickTableHeading(false) }>Close</button>
          </div>
        </div>
      </div>
    );

  }

  return (
    <div id="react-root">

      <div id="head">
      </div>

      <div id="react-middle">
            <table className="table table-striped" id="data-table">
              <thead><tr>{ headercells }</tr></thead>
              <tbody>{ rows }</tbody>
            </table>
        <div>{ getFieldDetails() }</div>
      </div>

      <div id="footer">
        <div style={({width: "25%", display: "inline-block"})}>
          <button
            className="btn btn-link bottom-bar-control"
            style={({ textAlign: "left" })}
            onClick={help(true)}
            >Help</button>
        </div>
        <div style={({ width: "75%", display: "inline-block", textAlign: "right" })}>
          <form className="form-horizontal bottom-bar-control">
            <div className="form-group as-inline-block">
              <label className="form-label">Mode:&nbsp;</label>
            </div>
            <div className="form-group as-inline-block">
              <select className="form-select"
                value={continuousMode}
                disabled={finished}
                onChange={toggleContinuousMode}
                >
                <option value={MODE.MANUAL}>Manual</option>
                <option value={MODE.CONTINUOUS}>Continuous</option>
                <option value={MODE.CONTINUOUS_AND_EXIT}>Continuous and Exit</option>
              </select>
            </div>
          </form>
          <button className="bottom-bar-control" disabled={ (loading || finished) ? true : false } onClick={scroll}>{ finished ? "Finished" : "More" }</button>
          <button className="bottom-bar-control" onClick={exit}>Exit</button>
        </div>
      </div>

      <div className={ showingHelp ? "modal active" : "modal" }>
        <a href="#close" className="modal-overlay" aria-label="Close" onClick={help(false)}>✕</a>
        <div className="modal-container" style={({maxWidth: "50rem"})}>
          <div className="modal-header">
            <div className="modal-title h4">Help</div>
          </div>
          <div className="modal-body">
            <div className="content">

<h5 id="about">About</h5>
<p>DiscoverTypes is an application for identifying the types of fields within a CSV file. It does this by comparing every cell against every regular expression the user has supplied. Because the CSV file could be HUGE it does not load the whole thing into memory but inspects it line by line as it passes through.</p>
<h5 id="usage">Usage</h5>
<pre className="shell code" data-lang="shell">
  cat test-data/burger-shop.csv | wv-linewise --code index.html \<br/>
  &nbsp;&nbsp;--stream in=- \<br/>
  &nbsp;&nbsp;--stream types=types.csv \<br/>
  &nbsp;&nbsp;--param &#39;Full US Date&#39;=&#39;^0*[0-9][0-2]?/[0-9]+/[0-9]{4}$&#39; \<br/>
  &nbsp;&nbsp;--param &#39;Full UK Date&#39;=&#39;^[0-9]+/0*[0-9][0-2]?/[0-9]{4}$&#39; \<br/>
  &nbsp;&nbsp;--param mode=&#39;continuous&#39;
</pre>
<p>Because DiscoverTypes is built upon WV Linewise it’s command line interface is the interface from WV Linewise… well I could wrap the program in a BASH/BAT file to make it more slick, but DiscoverTypes is actually only an example application for WV Linewise so I will not.</p>
<h6 id="the-in-stream-required">The “in” stream ( required )</h6>
<p>The “in” stream is where the actual CSV you want to inspect comes from. It could be huge…</p>
<p>If you use the special value <code>-</code> WV Linewise will read STDIN, otherwise this will be taken to be a filename and that file will be read.</p>
<h6 id="the-types-stream-optional">The “types” stream (optional)</h6>
<p>The “type” stream is a CSV with the following structure.</p>
<table className="table table-striped table-scroll">
<thead>
<tr className="header">
<th>name</th>
<th>regexp</th>
</tr>
</thead>
<tbody>
<tr className="odd">
<td>Integer</td>
<td>^-?[0-9]+</td>
</tr>
<tr className="even">
<td>String</td>
<td>.</td>
</tr>
<tr className="odd">
<td>NULL</td>
<td>^$</td>
</tr>
</tbody>
</table>
<p>The <code>name</code> is a types name and <code>regexp</code> is a JavaScript regular expression without the enclosing forward slashes.</p>
<h6 id="the-type-parameters-optional">The “type” parameters (optional)</h6>
<p>The type parameters are added to the “types” stream above with the <code>name</code> and the <code>regexp</code> taking the same form. Because WV Linewise has a singular <code>--param</code> command line argument written in the form <code>--param 'name=value</code>, which is moderately too verbose but at least quite specific.</p>
<p>The name must not conflict with any other parameter names otherwise it will need to can be specified in full, for example such as <code>--param 'type=Full UK Date=^[0-9]+/0*[0-9][0-2]?/[0-9]{4}$'</code>. Type parameters names also cannot include the <code>=</code> symbol.</p>
<h6 id="the-mode-parameter-optional">The “mode” parameter (optional)</h6>
<p>I think the ease of adding interactive elements within UNIX pipelines is one of the nicest parts of WV Linewise, but equally I would find it mildly annoying to page through over a million rows.</p>
<p>To deal with this I have introduced a “mode” to Discover Types which can take one of three values:</p>
<ul>
<li><code>manual</code> The default mode is “manual” and in this mode you will have to press “More” on the user interface to page through the data.</li>
<li><code>continuous</code> This mode will page automatically and will stop at the end, waiting for you to press the “Exit” button,</li>
<li><code>continuous-and-exit</code> This is same as <code>continuous</code> except that it exits automatically at the end.</li>
</ul>
<h5 id="the-output">The Output</h5>
<p>The following is an example of the CSV output:</p>
<table className="table table-striped table-scroll">
<thead>
<tr className="header">
<th>Column</th>
<th>Types</th>
<th>Count</th>
<th>Total Record Count</th>
</tr>
</thead>
<tbody>
<tr className="odd">
<td>salesPerson</td>
<td>[“String”]"</td>
<td>13</td>
<td>13</td>
</tr>
<tr className="even">
<td>date</td>
<td>[“String”,“Full US Date”,“Full UK Date”]"</td>
<td>8</td>
<td>13</td>
</tr>
<tr className="odd">
<td>date</td>
<td>[“NULL”]"</td>
<td>1</td>
<td>13</td>
</tr>
<tr className="even">
<td>date</td>
<td>[“String”,“Full UK Date”]"</td>
<td>4</td>
<td>13</td>
</tr>
<tr className="odd">
<td>orderId</td>
<td>[“Integer”,“String”]"</td>
<td>13</td>
<td>13</td>
</tr>
<tr className="even">
<td>item</td>
<td>[“String”]"</td>
<td>13</td>
<td>13</td>
</tr>
<tr className="odd">
<td>cost</td>
<td>[“String”]"</td>
<td>13</td>
<td>13</td>
</tr>
<tr className="even">
<td>price</td>
<td>[“Integer”,“String”]"</td>
<td>10</td>
<td>13</td>
</tr>
<tr className="odd">
<td>price</td>
<td>[“String”]"</td>
<td>3</td>
<td>13</td>
</tr>
<tr className="even">
<td>profit</td>
<td>[“String”]"</td>
<td>13</td>
<td>13</td>
</tr>
</tbody>
</table>
<p>Every cell within a CSV could be interpreted as 0 or more different types. Generally speaking I would use the regular expression <code>^$</code> (meaning a zero length string) to be <code>NULL</code> and <code>.</code> (at least one character in length) to be a String. This means that the integer <code>4</code> might be an integer (<code>^\-[0-9]+</code>) but could also a string. This is completely correct as you might have user input of a string type, which users tend to write integers in, an example of this may be local phone numbers, which are often just numbers, but sometimes include other characters, so are forced to be strings.</p>
<h6 id="why-we-dont-prefer-one-type-over-another">Why we don’t prefer one type over another</h6>
<p>Imagine you had 14 million lines and one column was full of dates and we preferred US dates format over the UK dates. The software would tell us we had 14 million (minus one) US dates and 1 UK date and you may conclude that the column is US dates with one error… but if all the dates were before the 12th of the month except <strong>that</strong> one, you’d probably be wrong.</p>
<p>This situation is actually shown in a much more simple form above. You can see that the date column must be one of the following:</p>
<ul>
<li>A “Full US Date” and therefore has 5 records in error.</li>
<li>A “String” and therefore has 1 record in error.</li>
<li>A “Full UK Date” and therefore has 1 record in error.</li>
<li><strong>A “String” with null allowed and therefore has 0 record in error.</strong></li>
<li><strong>A “Full UK Date” with null allowed and therefore has 0 record in error.</strong></li>
</ul>
<p>Given the output above it should be relatively trivial to write software, to figure out that the date column is actually a UK Date which allows nulls. But the caveat is that software needs to know to prefer “Full UK Date” over “String” which this software does not.</p>
<p>I may well add code and columns to:</p>
<ul>
<li>List out what the zero error candidates are. This would get you down to just “String” and “Full UK Date” in the above example.</li>
<li>Add at least one example for each row in the table above.</li>
</ul>

            </div>
          </div>
          <div className="modal-footer">
            <div style={({ float: "left", padding: "0.25rem" })}>© 2020 Matt Forrester</div>
            <button className="btn btn-link" aria-label="Close" onClick={help(false)}>Close</button>
          </div>
        </div>
      </div>

    </div>
  );
}
