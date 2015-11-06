package com.appspot.valencia594.mmo;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class WorldUpdateServlet extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final UserService userService = UserServiceFactory.getUserService();
		final User user = userService.getCurrentUser();
		
		user.getNickname();
		
		// get user state
		
		// update global game state
	}
}
