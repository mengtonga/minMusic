export default class Event{

	// 构造方法
	constructor(){
		// this.events={};//可枚举的颜色是紫色

		// 定义不可便利的属性,用来保存方法和类型
		Object.defineProperty(this,"events",{
			value:{},//对象
			enumerable:false//不可枚举
		});
	}

	//事件队列的触发器  that哪个实例触发
	static creatEventHandle(eType,that){
		// 生成触发器的包装函数
		Reflect.set(that,eType,function(...arg){
			// 将page八平村自来
			const page = this;
			//事件队列的方法

			const eTypeFn = Reflect.get(that.events, eType);
			eTypeFn.forEach(fn=>{
				//微信小程序自治性指针指向本身
				fn.apply(page,arg)
			});
		});
	}
	//获取事件队列
	getEvent(eType){
		let eTypeFn =Reflect.get(this.events,eType);//事件代理方式
		//判断是否为空
		if(!Array.isArray(eTypeFn)){
			eTypeFn=[];
			Reflect.set(this.events,eType,eTypeFn);
			// this.events[eType]=eTypeFn;

			//添加一个触发器
			Event.creatEventHandle(eType,this)
		}
		return eTypeFn;

	}

	// 添加一个事件监听  call把车开yige 方法
	addEvent(eType,callback){
		const eTypeFn=this.getEvent(eType);
		//添加到事件队列里
		eTypeFn.push(callback);
	}
} 