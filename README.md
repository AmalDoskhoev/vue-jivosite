# vue-jivosite

## What is vue-jivosite
vue-jivosite is a Vue plugin for online chat [JivoChat](https://www.jivochat.com/) that will allow you to add several missing features, in my opinion, on the front end.

It supports both Vue 2 and Vue 3.

## Usage

1. Install the package

```bash
$ npm i vue-jivosite
```

2. Use the plugin
```javascript
import VueJivosite from '@bchteam/vue-jivosite'

Vue.use(VueJivosite, { widgetId: 'fbas23URmI' })

//Instead of fbas23URmI, insert your Id
```

## API


| name         | type     |            default            | describe                                                                                                                                                                              |
| ------------ | :-----:  |:-----------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| widgetId        | String   |              ''               | id of your widget, can be found in the link when connecting the script (</script src="//code.jivo.ru/widget/fbas23URmI" async></script/>, fbas23URmI - your id)                       
| scriptUrl  | String  |              ''               | full link in your script (Optional field if you specified widgetId, </script src="//code.jivo.ru/widget/fbas23URmI" async></script/>, "//code.jivo.ru/widget/fbas23URmI" - your link) |
| onInit  | Function |             null              | handler for success loading can be added                                                                                                                                              |
|  onFail | Function |             null              | handler for failed loading can be added (if onFail handler is not provided, failed initialization throws exception, because of unhandled promise rejection)                           |
|  initialView        | Boolean   |             true              | a value indicating whether to show chat at all initially or not                                                                                                                       |

#### Example of using all values

```javascript
import VueJivosite from '@bchteam/vue-jivosite'

Vue.use(VueJivosite, {
	widgetId: 'fbas23URmI',
	scriptUrl: '//code.jivo.ru/widget/fbas23URmI',
	initialView: true,
	onInit()
	{
		console.log('Success!')
	},
	onFail(error)
	{
		console.log('Failed', error)
	}
})
```

 And if we set initialView to false, then how can we show or hide JivoChat? Very simple, just use this.$hideJivo() function to hide the chat and this.$showJivo() to show it.
```html
<template>
	Vue jivochat
	<button @click="$showJivo">Show jivochat</button>
	<button @click="$hideJivo">Hide jivochat</button>
<template>
```

They can also be used simply in js code:
```html
<template>
	Vue jivochat
</template>
<script>
    export default {
        methods: {
            openJivoChat()
            {
                this.$showJivo();
            },
            hideJivoChat()
            {
                this.$hideJivo();
            }
        }
    }
</script>
```
