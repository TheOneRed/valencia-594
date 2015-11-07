package com.appspot.valencia594.mmo;

public class Player {
	public final String userId;
	public final String userName;
	public long worldX = 0;
	public long worldY = 0;
	
	public Player(final String userId, final String userName) {
		this.userId = userId;
		this.userName = userName;		
	}
}
