package com.appspot.valencia594;

import java.io.IOException;
import javax.servlet.http.*;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class TestLoginServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final UserService userService = UserServiceFactory.getUserService();
		final User user = userService.getCurrentUser();
		
		resp.setContentType("text/plain");
		resp.getWriter().println("Hello, " + user.getNickname() + "[" + user.getUserId() + "]\n" + 
		"You are " + (userService.isUserAdmin() ? "" : "not ") + "an admin.");
	}
}
