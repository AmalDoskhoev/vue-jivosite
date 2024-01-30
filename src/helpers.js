function firstShowJivo()
{
	const observer = new MutationObserver(mutations =>
	{
		mutations.forEach(mutation =>
		{
			mutation.addedNodes.forEach(node =>
			{
				if (node.tagName === 'JDIV') node.style.display = 'none';
			});
		});
	});

	observer.observe(document.body, {childList: true, subtree: false});
}

function loadScript(jivoUrl, initialView)
{
	return new Promise((resolve, reject) =>
	{
		const head = document.head || document.getElementsByTagName('head')[0]
		const script = document.createElement('script')

		script.async = true
		script.src = jivoUrl

		head.appendChild(script)

		if (!initialView) firstShowJivo();

		script.onload = resolve
		script.onerror = reject
	})
}

function initJivo(jivoUrl, initialView = true)
{
	return new Promise((resolve, reject) =>
	{
		const funcToCall = () =>
		{
			loadScript(jivoUrl, initialView).then(resolve, reject)
		}

		if (document.readyState === 'complete')
			funcToCall()
		else
			window.addEventListener('load', funcToCall, false)
	})

}

export {initJivo}
