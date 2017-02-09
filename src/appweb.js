import Vue from 'vue';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css';
import "../css/appweb.css"

Vue.use(VueMaterial)

let Vue_App = new Vue({
	el: "#app",
	data: {
		testInput: "",
		testOut: "",
		timeTaskValue: null,
		localStorage: [], //本地搜索记录

		alert: {
			content: '输入不允许为空!',
			ok: '好的'
		},
		ready: false, //页面为准备好
	},
	created() {
		this.localStorage = this.getLocalStore().reverse();

		window.getData = (data) => {
			if (data) {
				this.testOut = data;
				return data;
			} else {
				this.testOut = "无返回值(可能报错,建议加入返回值查看是否调用成功)";
				return this.testOut;
			}
		}

		this.ready = true;
	},
	methods: {
		c_testInput() {
			console.log(this.testInput);
			if (this.testInput !== "") {
				this.localStore(this.testInput);
				this.localStorage = this.getLocalStore().reverse();
				this.timeTask();
				this.timeTaskValue = eval(this.testInput);

			} else {
				this.$refs.dialog.open();
			}
		},
		timeTask() {
			setTimeout(() => {
				if (Object.prototype.toString.call(this.timeTaskValue).replace(/\[object (\w*)\]/, "$1").toLowerCase() === 'null') {
					this.testOut = "无返回值(可能报错,建议加入返回值查看是否调用成功)";
				} else {
					this.testOut = this.timeTaskValue;
					this.timeTaskValue = null;
				}
			}, 100)
		},
		c_clearTestInput() {
			this.testInput = "";
			this.testOut = ""
		},
		//获取储存的搜索数据
		getLocalStore() {
			if (window.localStorage.getItem("Test") !== null) {
				//之前有数据
				let oldValue = JSON.parse(window.localStorage.getItem("Test")); //获取数据
				return oldValue;
			} else {
				// 第一次储存
				return [];
			}
		},
		localStore(string) {
			let data = this.getLocalStore();

			let newData = [];

			// 检测是否已有相同的数据路线,删除重复的
			for (let i = 0; i < data.length; i++) {
				if (data[i] !== string) {
					newData.push(data[i]);
				}
			}
			newData.push(string); //最后才推入这个
			//等于10的时候需要截取一部分
			if (newData.length === 5) {
				newData.splice(0, 5);
			}

			window.localStorage.setItem("Test", JSON.stringify(newData));
		},
		goToTest(code) {
			this.testInput = code;
			this.c_testInput();
		},
		c_clearTestHis() {
			window.localStorage.clear("Test")
		}
	}
})
