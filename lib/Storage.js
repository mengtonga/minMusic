

// 离线缓存的类Storage
export default class Storage{
// 这是一个构造函数
	constructor(dbname){
		Object.assign(this,{
			dbname,//数据库名
			cache:{
				add:{
					data:[]
				}
			}//类的缓存，避免直接操作数据库
		});
		console.log(Storage.getDb(dbname));
	}

	//实时获取类数据库中的数据
	static getDb(dbname){
		return wx.getStorageSync(dbname)|| []
	}

	// 添加数据的方法
	add(data){
			if(Array.isArray(data)){
				data.forEach(item=>{
					this.add(item)
				})
			}
			// 判断穿件来的是不是对象
			else if (/object/.test(typeof data)){
				// 讲数据push进缓存
				this.cache.add.data.push(data)
			}
			// 是数组
			else{
				throw new Error("add方法接受对象我参数")
			}
			return this;
	}

	//将缓存更新到本地数据
	save(){
		//先去本地缓存拿数据，接着将新添加的数据合并保存
		// const db = this.getDb(this.dbname); 由于getDb是静太方法，实例不能调用
		let db = Storage.getDb(this.dbname);
		
		// 是否存在add数据缓存
		if(this.cache.add){
			db.push(...this.cache.add.data);
		}
		console.log(db)

		// 更新本地缓存
		wx.setStorageSync(this.dbname,db);

		// 更新类的缓存
		this.cache={
			add:{
				data:[]
			}
		}
	  return this
	}
}