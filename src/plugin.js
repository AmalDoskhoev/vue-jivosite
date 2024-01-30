import {initJivo} from './helpers'

export default {
	install(Vue, {widgetId, scriptUrl = "", initialView = true, onInit = null, onFail = null})
	{
		if (!widgetId && !scriptUrl) throw new Error("[vue-jivosite] You need to specify either the widget id or the entire script url")

		let jivoUrl;

		if (widgetId)
			jivoUrl = `//code.jivosite.com/script/widget/${widgetId}`
		else
			jivoUrl = scriptUrl;

		initJivo(jivoUrl, initialView).then((payload) =>
		{
			if (typeof onInit === 'function') onInit(payload)
		}, (error) =>
		{
			if (typeof onFail === 'function')
				onFail(error)
			else
				throw error
		});

		// en: Checking the Vue version and adding a method to the prototype accordingly
		// ru: Проверка версии Vue и добавление метода к прототипу соответственно
		if (Vue.version.startsWith('3.'))
		{
			// Vue 3
			Vue.config.globalProperties.$hideJivo = function ()
			{
				const jdiv = document.querySelector('jdiv');
				if (!jdiv) return;
				jdiv.style.display = 'none';
			};
		} else
		{
			// Vue 2
			Vue.prototype.$hideJivo = function ()
			{
				const jdiv = document.querySelector('jdiv');
				if (!jdiv) return;
				jdiv.style.display = 'none';
			};
		}
	}
}
