package com.ysd.springboot.websocket;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

/**
 * 拦截器实现 Socket建立连接（握手）和断开 这个类的作用就是在连接成功前和成功后增加一些额外的功能
 * beforeHandshake，在调用handler前处理方法。常用在注册用户信息，绑定WebSocketSession，在handler里根据用户信息获取WebSocketSession发送消息。
 */
public class MyHandShakeInterceptor implements HandshakeInterceptor {

	/**
	 * 在握手之前执行该方法, 继续握手返回true, 中断握手返回false. 通过attributes参数设置WebSocketSession的属性
	 */
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		// 取出javax.servlet.http.HttpSession中的 uId 属性值
		System.out.println("在握手之前执行该方法.Websocket:用户连接成功 [HttpSession中属性 uId:"
				+ ((ServletServerHttpRequest) request).getServletRequest().getSession(false).getAttribute("uId")
				+ "]已经建立连接");
		if (request instanceof ServletServerHttpRequest) {
			ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
			HttpSession session = servletRequest.getServletRequest().getSession(false);// 获取session对象
			String sessionId = session.getId();
			System.out.println("HandshakeInterceptor 开始处理一次WebSocket服务 sessionId=>" + sessionId);
			System.out.println("HttpSession中的userName=>" + session.getAttribute("userName"));
			System.out.println("HttpSession中的uId=>" + session.getAttribute("uId"));
			System.out.println("HandshakeInterceptor WebSocketSession中的uId设置值之前=>" + attributes.get("uId"));
			// 标记用户
			String uId = (String) session.getAttribute("uId");
			if (uId != null) {
				attributes.put("uId", uId);// 向WebSocketSession中放入uId属性值
				attributes.put("userName", session.getAttribute("userName"));
			} else {
				// return false;//禁止访问WebSocket服务
				return true;// 放行 WebSocket服务
			}
		}
		return true;
	}

	/**
	 * 在握手之后执行该方法. 无论是否握手成功都指明了响应状态码和相应头.
	 */
	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception exception) {
		ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
		HttpSession session = servletRequest.getServletRequest().getSession(false);
		String sessionId = session.getId();
		System.out.println("在握手之后执行该方法.处理完一次WebSocket服务 sessionId=>" + sessionId);
	}

}
