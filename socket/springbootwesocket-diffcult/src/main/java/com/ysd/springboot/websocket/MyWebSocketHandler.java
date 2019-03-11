package com.ysd.springboot.websocket;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * WebSocket服务器处理器
 */
@Component
public class MyWebSocketHandler implements WebSocketHandler {

	private static Map<String, WebSocketSession> userIdMap = new HashMap<String, WebSocketSession>();// map中存储当前登录用户的ID,和客户端WebSocketSession

	@Autowired
	private ObjectMapper jackson;

	/**
	 * **************************************************************** 客户端 成功连接服务器
	 * *****************************************
	 * 
	 * @OnOpen 连接建立后处理 连接成功时候，会触发onopen方法
	 */
	@Override
	public void afterConnectionEstablished(WebSocketSession webSocketSession) throws Exception {
		System.out.println("@OnOpen   webSocketSession中的userName=>" + webSocketSession.getAttributes().get("userName"));// 取出weSocketSession中的当前用户名称
		System.out.println("@OnOpen   webSocketSession中的uId=>" + webSocketSession.getAttributes().get("uId"));// 取出weSocketSession中的当前用户Id

		String uId = (String) webSocketSession.getAttributes().get("uId");
		if (uId != null) {
			userIdMap.put(uId, webSocketSession);// 客户端连接服务器时,把当前用户Id和当前用户weSocketSession存储起来备用,以后用weSocketSession给客户端发消息
		}
		// 测试发送一句回复的话
		sendMessageToUser(uId, uId + "你好我是服务器发送来的数据你接收到显示在控制台了吧");
	}

	/**
	 * **************************************************************** 接收客户端消息
	 * *****************************************
	 * 
	 * @OnMessage 接收文本消息，并发送出去 在UI在用js调用websocket.send()时候，会调用该方法
	 *            消息处理，在客户端通过Websocket API发送的消息会经过这里，然后进行相应的处理
	 */
	@Override
	public void handleMessage(WebSocketSession webSocketSession, WebSocketMessage<?> message) throws Exception {
		System.err.println("@OnMessage服务器接收到客户端的数据=>" + message.getPayload().toString());
		if (message.getPayloadLength() == 0)
			return;
		String toUserId = (String) webSocketSession.getAttributes().get("uId");// 取出自己的uId
		String toUserMessage = "你好你自己发的你自己收到我的数据了吗";
		sendMessageToUser(toUserId, toUserMessage);// 给指定userId的用户发送信息
		String broadMessage = "大家好,我是新来的,请多多关照!!!";
		broadcast(broadMessage);// 给当前服务器所有客户端发送信息
	}

	/**
	 * **************************************************************** 客户端发生异常错误
	 * *****************************************
	 * 
	 * @OnError 抛出异常时处理 消息传输错误处理 消息传输抛出异常时
	 */
	@Override
	public void handleTransportError(WebSocketSession webSocketSession, Throwable exception) throws Exception {
		String uId = (String) webSocketSession.getAttributes().get("uId");
		System.err.println("@OnError服务器与" + uId + "客户端" + webSocketSession.getAttributes().get("userName") + "通信异常错误=>"
				+ exception);

		/*
		 * if (webSocketSession.isOpen()) { webSocketSession.close(); }
		 * userIdMap.remove(uId);//移除传输发生错误的客户端
		 */
	}

	/**
	 * **************************************************************** 客户端关闭
	 * *****************************************
	 * 
	 * @OnClose 客户端关闭连接后
	 */
	@Override
	public void afterConnectionClosed(WebSocketSession webSocketSession, CloseStatus closeStatus) throws Exception {
		String uId = (String) webSocketSession.getAttributes().get("uId");
		System.out.println("@OnClose客户端浏览器关闭" + uId + "客户端" + webSocketSession.getAttributes().get("userName"));
		// 移除WebSocket会话
		userIdMap.remove(uId);// 移除已经关闭的客户端
	}

	/**
	 * WebSocketHandler是否处理部分消息。
	 * 如果这个标志被设置为true，而底层的WebSocket服务器支持部分消息，那么一个大的WebSocket消息，或者一个未知的大小可能会被拆分，并且可能会收到多个调用的handleMessage(WebSocketSession,WebSocketMessage)。标记WebSocketMessage.isLast()表示该消息是否是部分消息，以及它是否是最后一部分。
	 */
	@Override
	public boolean supportsPartialMessages() {
		return false;// WebSocket接收信息不拆分.
	}

	/**
	 * 给所有在线用户发送消息 多线程发送
	 */
	public void broadcast(final String message) throws IOException {
		final TextMessage textMessage = new TextMessage(message);
		Iterator<Entry<String, WebSocketSession>> it = userIdMap.entrySet().iterator();
		// 多线程群发
		while (it.hasNext()) {
			final Entry<String, WebSocketSession> entry = it.next();
			if (entry.getValue().isOpen()) {
				// entry.getValue().sendMessage(message);
				new Thread(new Runnable() {
					public void run() {
						try {
							if (entry.getValue().isOpen()) {
								entry.getValue().sendMessage(textMessage);
							}
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}).start();
			}
		}
	}

	/**
	 * 给某个用户发送消息
	 */
	public void sendMessageToUser(String uid, String message) throws IOException {
		WebSocketSession session = userIdMap.get(uid);
		if (session != null && session.isOpen()) {
			session.sendMessage(new TextMessage(message));
		}
	}

}
