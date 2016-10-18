//工具函数，用于在控制台上输出操作结果
import {util} from './util';


let consoleLog = util.$('.console-log');

function log(command, state) {
    var text = command.order + ' ship' + ' in orbit ' + command.id + '......';
    if (!state) {
        text = 'failed to ' + text;
    }
    var li = document.createElement('li'),
        logs = document.createTextNode(text);
    li.appendChild(logs);
    consoleLog.appendChild(li);
    consoleLog.scrollTop = consoleLog.scrollHeight;
}

export {log};