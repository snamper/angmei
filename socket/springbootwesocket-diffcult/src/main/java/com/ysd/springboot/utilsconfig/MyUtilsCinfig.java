package com.ysd.springboot.utilsconfig;
//import static org.mockito.Mockito.RETURNS_DEEP_STUBS;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 我们可以通过这种方式把想用的工具类实例对象先放入Spirng容器中,在需要使用到的的时候自动注入即可.
 * 
 * @Description: Spring容器配置
 */
@Configuration // Spring容器配置
public class MyUtilsCinfig {

	/**
	 * 往Spring容器中放入一个ObjectMapper实例对象
	 */
	@Bean("jackson")
	public ObjectMapper jacksonBean() {
		return new ObjectMapper();
	}

	/**
	 * 往Spring容器中放入一个SimpleDateFormat实例对象
	 */
	@Bean("dateFormat")
	public SimpleDateFormat dateFormatBean() {
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	}

}
