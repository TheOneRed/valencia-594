package com.appspot.valencia594.mmo;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.channel.ChannelPresence;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;

@SuppressWarnings("serial")
public class ChannelDisconnectedServlet extends HttpServlet {
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final ChannelService channelService = ChannelServiceFactory.getChannelService();
		final ChannelPresence presence = channelService.parsePresence(req);
				
		if (!presence.isConnected()) {
			// save client state to db
			
			// remove client from world
			World.players.remove(presence.clientId());
		}
	}
}
