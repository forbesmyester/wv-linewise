export function getErrorHandler() {

    const ERROR_LEVEL_DEBUG=1;
    const ERROR_LEVEL_INFO=2;
    const ERROR_LEVEL_WARN=3;
    const ERROR_LEVEL_ERROR=4;
    const ERROR_LEVEL_FATAL=5;

    let errors = [];
    let showing = false;

    let holder = document.getElementById("error-display-holder");
    let closer = document.getElementById("error-display-closer");
    let title = document.getElementById("error-display-title");
    let body = document.getElementById("error-display-body");

    function showError() {

        showing = true;
        if (!errors.length) {
            holder.classList.remove("visible");
            showing = false;
            return;
        }
        holder.classList.add("visible");
        holder.classList.remove("warning");
        holder.classList.remove("error");

        let errorObj = errors.shift();

        title.innerText = "Message";
        body.innerText = errorObj.error.message;

        switch (errorObj.level) {
            case ERROR_LEVEL_DEBUG:
                title.innerText = "Debug";
                break;
            case ERROR_LEVEL_INFO:
                title.innerText = "Information";
                break;
            case ERROR_LEVEL_WARN:
                title.innerText = "Warning";
                holder.classList.add("warning");
                break;
            case ERROR_LEVEL_ERROR:
                title.innerText = "Error";
                holder.classList.add("error");
                break;
            case ERROR_LEVEL_FATAL:
            default:
                title.innerText = "Fatal Error";
                if (closer) {
                    closer.style.display = "none";
                }
                holder.classList.add("error");
                break;
        }

        holder.display = "block";
    }

    function handleError(e, level=5) {
        errors = errors.filter(
            (eo, index) => (index <= 9) || (eo.level > level)
        )
        if (errors.length <= 9) {
            errors.push({ error: e, level });
        }
        if (!showing) {
            showError();
        }
    }

    if (closer) {
        closer.onclick = showError;
    }

    handleError.ERROR_LEVEL_DEBUG = ERROR_LEVEL_DEBUG;
    handleError.ERROR_LEVEL_INFO = ERROR_LEVEL_INFO;
    handleError.ERROR_LEVEL_WARN = ERROR_LEVEL_WARN;
    handleError.ERROR_LEVEL_ERROR = ERROR_LEVEL_ERROR;
    handleError.ERROR_LEVEL_FATAL = ERROR_LEVEL_FATAL;

    return handleError;

}


