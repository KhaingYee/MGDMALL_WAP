export default {
    checkNull(checkword) {
        if (checkword.match(/^\s+$/)) {
            alert("all space or \\n");
            return;
        }
        if (checkword.match(/^[ ]+$/)) {
            alert("all space");
            return;
        }
        if (checkword.match(/^[ ]*$/)) {
            alert("all space or empty");
            return;
        }
        if (checkword.match(/^\s*$/)) {
            alert("all space or \\n or empty");
            return;
        } else {
            return  checkword.replace(/\s*/g, "");
        }
    }
};
