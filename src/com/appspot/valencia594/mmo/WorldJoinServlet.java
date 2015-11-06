package com.appspot.valencia594.mmo;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class WorldJoinServlet extends HttpServlet {
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final UserService userService = UserServiceFactory.getUserService();
		final User user = userService.getCurrentUser();
		
		// do existing user check
		
		// get user state
		
		// create channel
		final ChannelService channelService = ChannelServiceFactory.getChannelService();
		final String token = channelService.createChannel(user.getUserId());
		
		// return json with channel token and user state		
		resp.setContentType("application/json;charset=UTF-8");
		resp.getWriter().print("{ \"token\":\"" + token + "\"}");
	}
}
