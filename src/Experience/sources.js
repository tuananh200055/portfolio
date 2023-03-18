export default [
	{
		name :'environmentMapTexture',
		type :'cubeTexture',
		path:
		[
			'textures/environmentMap/px.jpg',
			'textures/environmentMap/nx.jpg',
			'textures/environmentMap/py.jpg',
			'textures/environmentMap/ny.jpg',
			'textures/environmentMap/pz.jpg',
			'textures/environmentMap/nz.jpg',
		]
	},
	{
		name : 'grassColorTexture',
		type : 'texture',
		path : 'textures/dirt/color.jpg'
	},
	{
		name : 'grassNormalTexture',
		type : 'texture',
		path : 'textures/dirt/normal.jpg'
	}
	,
	{
		name : 'roomTexture',
		type : 'texture',
		path : 'models/Room/bakedRoom.jpg'
	},
	{
		name : 'desktopScreenTexture',
		type : 'texture',
		path : 'models/Room/screen.png'
	},
	// {
	// 	name : 'desktopScreenTexture',
	// 	type : 'texture',
	// 	path : 'img/color.jpg'
	// },
	{
		name : 'characterTexture',
		type : 'texture',
		path : 'models/Character/bakedCharacter.jpg'
	},
	{
		name : 'portalTexture',
		type : 'texture',
		path : 'models/portal/baked.jpg'
	},
	{
		name : 'foxModel',
		type : 'gltfModel',
		path : 'models/fox/glTF/Fox.gltf'
	},
	{
		name : 'room',
		type : 'gltfModel',
		path : 'models/Room/room.glb'
	},
	{
		name : 'character',
		type : 'gltfModel',
		path : 'models/Character/character.glb'
	},
	{
		name : 'portal',
		type : 'gltfModel',
		path : 'models/portal/portal.glb'
	}
]