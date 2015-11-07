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
import com.google.appengine.api.channel.ChannelPresence;
import com.google.appengine.api.channel.ChannelService;
import com.google.appengine.api.channel.ChannelServiceFactory;

@SuppressWarnings("serial")
public class ChannelConnectedServlet extends HttpServlet {
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		
		final ChannelService channelService = ChannelServiceFactory.getChannelService();
		final ChannelPresence presence = channelService.parsePresence(req);
				
		if (presence.isConnected()) {
			// populate current world data to user
			final JacksonFactory jFact = new JacksonFactory();
			final Writer writer = new StringWriter();
			final Writer writer2 = new StringWriter();
			final JsonGenerator jGen = jFact.createJsonGenerator(writer);
			final JsonGenerator jGen2 = jFact.createJsonGenerator(writer2);
			final Player newPlayer = World.players.get(presence.clientId());
			
			jGen2.writeStartObject();
			jGen2.writeFieldName("players");
			jGen2.writeStartArray();
			jGen2.writeStartObject();
			jGen2.writeFieldName("userId");
			jGen2.writeString(newPlayer.userId);
			jGen2.writeFieldName("userName");
			jGen2.writeString(newPlayer.userName);
			jGen2.writeFieldName("worldX");
			jGen2.writeNumber(newPlayer.worldX);
			jGen2.writeFieldName("worldY");
			jGen2.writeNumber(newPlayer.worldY);
			jGen2.writeEndObject();
			jGen2.writeEndArray();
			jGen2.writeEndObject();
			jGen2.close();
			final String newPlayerStr = writer2.toString();
			writer2.close();
			
			jGen.writeStartObject();
			jGen.writeFieldName("players");
			jGen.writeStartArray();
			for (Player player : World.players.values()) {
				if (presence.clientId().equals(player.userId)) continue;
				channelService.sendMessage(new ChannelMessage(player.userId, newPlayerStr));
				
				jGen.writeStartObject();
				jGen.writeFieldName("userId");
				jGen.writeString(player.userId);
				jGen.writeFieldName("userName");
				jGen.writeString(player.userName);
				jGen.writeFieldName("worldX");
				jGen.writeNumber(player.worldX);
				jGen.writeFieldName("worldY");
				jGen.writeNumber(player.worldY);
				jGen.writeEndObject();
			}
			jGen.writeEndArray();
			jGen.writeEndObject();
			jGen.close();
			
			channelService.sendMessage(new ChannelMessage(presence.clientId(), writer.toString()));
		}
	}
}
