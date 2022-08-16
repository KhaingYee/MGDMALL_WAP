export default {
    scrollTitle(title) {
        if (window.window.setIntervalTitle) {
            clearInterval(window.window.setIntervalTitle)
        }
        window.setIntervalTitle = setInterval(() => {
            //ES6箭头函数
            // 截取首字符串(第一个)
            var head = title.substring(0, 1);
            // 截取除首字符串外所有字符串(除第一个所有)
            var foot = title.substring(1);
            // 头尾拼接后赋给data => tit属性
            title = foot + head;
            // 最后赋给最终显示的标题(标题)
            document.title = title;

        }, 1000);
    }
};
