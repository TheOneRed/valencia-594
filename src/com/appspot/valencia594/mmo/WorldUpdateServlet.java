package com.appspot.valencia594.mmo;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.api.client.json.JsonGenerator;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.appengine.api.channel.ChannelMessage;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class WorldUpdateServlet extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final ChannelService channelService = ChannelServiceFactory.getChannelService();
		final UserService userService = UserServiceFactory.getUserService();
		final User user = userService.getCurrentUser();
		
		// get user state
		final String[] worldX = req.getParameterValues("worldX");
		final String[] worldY = req.getParameterValues("worldY");
		final String[] message = req.getParameterValues("message");
				
		final Writer writer = new StringWriter();
		final JacksonFactory jFact = new JacksonFactory();
		final JsonGenerator jGen = jFact.createJsonGenerator(writer);
		
		jGen.writeStartObject();
		jGen.writeFieldName("players");
		jGen.writeStartArray();
		jGen.writeStartObject();
		
		jGen.writeFieldName("userId");
		jGen.writeString(user.getUserId());
		
		if (worldX != null) {
			jGen.writeFieldName("worldX");
			try {
				jGen.writeNumber(Double.parseDouble(worldX[0]));
			} catch (NumberFormatException e) {
				jGen.writeNull();
			}			
		}
		if (worldY != null) {
			jGen.writeFieldName("worldY");
			try {
				jGen.writeNumber(Double.parseDouble(worldY[0]));
			} catch (NumberFormatException e) {
				jGen.writeNull();
			}	
		}
		if (message != null) {
			jGen.writeFieldName("message");
			jGen.writeString(message[0].substring(0, Math.min(message[0].length(), 100)));
		}
		jGen.writeEndObject();
		jGen.writeEndArray();
		jGen.writeEndObject();
		jGen.close();
		
		// update global game state
		for (Player player : World.players.values()) {
			if (user.getUserId().equals(player.userId)) continue;			
			channelService.sendMessage(new ChannelMessage(player.userId, writer.toString()));
		}
	}
}
