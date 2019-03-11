package com.ysd.springboot.websocket;

import javax.annotation.Resource;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * 给WebSocket服务配置URL WebScoket配置处理器 WebSocket入口 这个类是配置类，所以需要在spring
 * mvc配置文件中加入对这个类的扫描，第一个addHandler是对正常连接的配置，第二个是如果浏览器不支持websocket，使用socketjs模拟websocket的连接。
 * 
 * 实现WebSocketConfigurer接口，重写registerWebSocketHandlers方法，这是一个核心实现方法，配置websocket入口，允许访问的域、注册Handler、SockJs支持和拦截器。
 * registry.addHandler注册和路由的功能，当客户端发起websocket连接，把/path交给对应的handler处理，而不实现具体的业务逻辑，可以理解为收集和任务分发中心。
 * setAllowedOrigins(String[]
 * domains),允许指定的域名或IP(含端口号)建立长连接，如果只允许自家域名访问，这里轻松设置。如果不限时使用"*"号，如果指定了域名，则必须要以http或https开头。
 * addInterceptors，顾名思义就是为handler添加拦截器，可以在调用handler前后加入我们自己的逻辑代码。 spring
 * websocket也支持STOMP协议,此处不演示。
 */

@Component // 扫描到Spring IOC容器
@EnableWebSocket // 启用WebSocket服务器
public class MyWebSocketConfig extends WebMvcConfigurerAdapter implements WebSocketConfigurer {

	@Resource
	MyWebSocketHandler myWebSocketHandler;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

		// WebSocket通道
		registry.addHandler(myWebSocketHandler, "/myWebsocket").addInterceptors(new MyHandShakeInterceptor());
		registry.addHandler(myWebSocketHandler, "/myWebsocket/sockjs").addInterceptors(new MyHandShakeInterceptor()).withSockJS();

		// -------------------- 允许跨域访问WebSocket ------------------------
		String[] allowsOrigins = { "*" }; // 允许连接的域,只能以http或https开头
	}

}
