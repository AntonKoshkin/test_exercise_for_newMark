{{#shapes}}{{#selector.shape}}{{#escape}}${{name}}-name = '{{name}}'
${{name}}-x = -{{position.relative.x}}
${{name}}-y = -{{position.relative.y}}
${{name}}-width = {{width.outer}}px
${{name}}-height = {{height.outer}}px
${{name}}-image = url({{{sprite}}})
${{name}} = '{{name}}' {{position.relative.x}}px {{position.relative.y}}px {{width.outer}}px {{height.outer}}px url({{{sprite}}})
{{/escape}}
{{/selector.shape}}{{/shapes}}

svg-sprite($sprite)
	width $sprite[3]
	height $sprite[4]
	background-position $sprite[1] $sprite[2]
	background-image $sprite[5]
	
// элемент спрайта вставляется так:
// svg-sprite($pic-name)
// это тот самый шаблое
// скомпилится в следующее
// .pic-name {
// 	width: {pic-width};
// 	height: {pic-height};
// 	background-position: pic-x pic-y;
// 	background-image: url(pic-url);
// }