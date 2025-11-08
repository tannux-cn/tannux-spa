package com.tannux.demo.spa.server.peer.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.tannux.core.bean.BMProxy;
import com.tannux.core.exception.MessageException;
import com.tannux.core.io.FileSystem;
import com.tannux.core.json.JSON;
import com.tannux.core.lang.ArrayUtils;
import com.tannux.core.util.SecurityList;
import com.tannux.core.util.TannuxUtils;
import com.tannux.demo.spa.server.bean.EntityBean;
import com.tannux.framework.util.FrameUtils;


/**
 * 演示环境, 数据就只存内存中
 */
public abstract class AbstractPeer<E extends EntityBean> {
	
	private final Object syncobj = new Object();
	private long serialNo = 0;
	private final LinkedList<E> data = new LinkedList<E>();
	private File file;
	
	
	protected AbstractPeer() {
		File root = new File(".");
		File dir = new File(root, "data");
		if(!dir.isDirectory() && !dir.mkdirs()) {
			throw new MessageException("create data dir error : " + dir.getAbsolutePath());
		}
		this.file = new File(dir, this.getClass().getSimpleName()+".data.json");
		loadStore();
	}
	
	
	
	/**
	 * 文件JSON结构: 
	 * {
	 * 		data : [{},{},...{}]
	 * 		//子类扩展
	 * }
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void loadStore() {
		synchronized (syncobj) {
			if(this.file.isFile()) {
				String s = FileSystem.read(file, "UTF-8");
				if(s!=null && (s=s.trim()).length()>2 && s.charAt(0)=='{' && s.charAt(s.length()-1)=='}') {
					Map<String, Object> store = (Map)JSON.toObject(s);
					
					if(!TannuxUtils.isEmpty(store)) {
						List<Object> records = (List)store.get("data");
						if(!TannuxUtils.isEmpty(records)) {
							BMProxy<E> proxy = BMProxy.getInstance(getEntityClass());
							for(Object o : records) {
								E record = proxy.newInstance();
								proxy.copyFrom(o);
								this.data.add(record);
							}
						}
						
						//子类扩展
						doLoadStore(store);
					}
				}
			}
		}
	}
	
	protected void saveStore() {
		synchronized (syncobj) {
			Map<String, Object> map = new HashMap<String, Object>();
			doSaveStore(map);
			
			map.put("data", data);
			String s = JSON.toString(map);
			FileSystem.write(file, s, "UTF-8");
		}
	}
	
	
	
	protected abstract Class<E> getEntityClass();
	
	
	/**
	 * 子类扩展
	 * @param store
	 */
	protected void doLoadStore(Map<String, Object> store) {
	}
	
	
	/**
	 * 子类扩展
	 * @param store
	 */
	protected void doSaveStore(Map<String, Object> store) {
	}
	
	
	
	protected long nextId() {
		long id = 0;
		synchronized (data) {
			serialNo ++ ;
			id = serialNo;
		}
		return id;
	}
	
	
	/**
	 * 获取所有数据
	 * @return
	 */
	public List<E> getData() {
		synchronized (syncobj) {
			return new SecurityList<E>(data);
		}
	}
	
	
	/**
	 * 根据ID查询数据
	 * @param id
	 * @return
	 */
	public E get(Long id) {
		E result = null;
		if(id != null) {
			synchronized (syncobj) {
				for(E item : data) {
					if(id.equals(item.getId())) {
						result = item;
						break;
					}
				}
			}
		}
		return result;
	}
	
	
	
	/**
	 * 根据ID查询数据
	 * @param id
	 * @return
	 */
	public List<E> gets(Long[] ids) {
		List<E> list = new ArrayList<E>();
		if(!TannuxUtils.isEmpty(ids)) {
			Set<Long> set = ArrayUtils.toSet(ids);
			synchronized (syncobj) {
				for(E item : data) {
					if(set.contains(item.getId())) {
						list.add(item);
					}
				}
			}
		}
		return list;
	}
	
	
	
	/**
	 * 设置数据, 跟据id判断, 已存在则更新, 不存在则插入
	 * @param record
	 * @return id
	 */
	public long set(E record) {
		FrameUtils.checkEmpty(record, "记录");
		Long id = record.getId();
		
		synchronized (syncobj) {
			//ID为空标签新增
			if(id == null) {
				id = nextId();
				record.setId(id);
				data.add(record);
			}else {
				E old = get(id);
				if(old == null) {
					throw new MessageException("记录不存在["+id+"].");
				}
				
				BMProxy<E> proxy = BMProxy.getInstance(old);
				proxy.copyFrom(record, true);
			}
			saveStore();
		}
		return id;
	}
	
	
	
	/**
	 * 根据ID删除记录
	 * @param id
	 * @return
	 */
	public int remove(Long id) {
		int count = 0;
		if(id != null) {
			synchronized (syncobj) {
				Iterator<E> itor = data.iterator();
				while(itor.hasNext()) {
					E item = itor.next();
					if(id.equals(item.getId())) {
						itor.remove();
						count = 1;
						break;
					}
				}
				if(count > 0) {
					saveStore();
				}
			}
		}
		return count;
	}

}
