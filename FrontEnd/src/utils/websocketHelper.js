import { w3cwebsocket as W3CWebSocket } from "websocket";
import { constHostAddressConfig } from "./commonData";

import { ProcessMsgNewOrder, ProcessMsgStockTotal, ProcessMsgBoardInfo, ProcessMsgMoneyType, ProcessPeriodRemain, ProcessMsgCurrentTime, ProcessMsgMarketInfos, ProcessMsgReload } from './processMsgHelper';

export const wsMsgType = {
    MsgNewOrder: "NO",
    MsgReloadData: "RL",
}

export const wsMsgSeparatorChar = {
    DataSeparatorChar: "*",
    PropSeparatorChar: "|",
    ObjectSeparatorChar: "$",
}

const wsReadyState = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
};

let wsClient = null;
const connectWS = () => {
    
    if (wsClient === null || wsClient.readyState === wsReadyState.CLOSED) {
        wsClient = new W3CWebSocket(constHostAddressConfig.WSHostAddress);

        wsClient.onopen = () => {
            console.log("WS Connected-", new Date());
            // sendMessage(`${wsMsgType.Req_Header}*${wsMsgType.Req_CurrentTime}`);
            // sendMessage(`${wsMsgType.Req_Header}*${wsMsgType.Req_InitData}`);
        };
        wsClient.onmessage = (evt) => {
            // console.log(evt.data);
            OnReceiveMessage(evt.data);
        };
        wsClient.onerror = (evt) => {
            console.log(evt);
        };
        wsClient.onclose = (message) => {
            console.log("WS Disconnected-", new Date());
            connectWS();
        };
    }
};

connectWS();

export const sendMessage = (message) => {
    if (wsClient && wsClient.readyState === wsReadyState.OPEN) {
        wsClient.send(message);
        console.log("send ", message);
    } else {
        console.log("WS not opened");
    }
};

// Xu ly msg nhan dc
const OnReceiveMessage = (rawMessage) => {
    const msgType = rawMessage.split('~')[0];
    const msg = rawMessage.split('~')[1];

    try {
        if (msgType === wsMsgType.MsgNewOrder) {
            ProcessMsgNewOrder(msg, true);
        } else if (msgType === wsMsgType.MsgReloadData){
            ProcessMsgReload(msg, true);
        }
    } catch (error) {
        console.log(error);
    }
};
