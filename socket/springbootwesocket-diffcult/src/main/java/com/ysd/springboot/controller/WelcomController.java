package com.ysd.springboot.controller;

import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Description: 默认首页
 */
@Controller
public class WelcomController {

	/**
	 * 项目默认首页
	 */
	@RequestMapping("/")
	public String index(HttpSession session) {
		session.setAttribute("uId", this.randomUserId());// 在用户登录成功后设置用户登录信息
		session.setAttribute("userName", "你猜我是谁" + UUID.randomUUID());// 在用户登录成功后设置用户登录信息
		return "redirect:/index.html";// 重定向到首页 public/index.html
	}

	/**
	 * 随机获取一个[1-10]范围的用户uId
	 */
	private String randomUserId() { //获得1-10的随机数
		String uId = "";
		Integer d = (int) (1 + Math.floor(Math.random() * 10)); //产生1-10的随机数
		uId = String.valueOf(d);
		System.out.println("WelcomController随机获取一个[1-10]范围的用户uId=>" + uId);
		return uId;
	}

}
