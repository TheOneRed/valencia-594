package com.appspot.valencia594.mmo;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class World {
	public static ConcurrentMap<String, Player> players = new ConcurrentHashMap<String, Player>();	
}
