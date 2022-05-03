import {AssetSource, AudioAsset, FbxAsset, GltfAsset, ImageAsset, ProgressCallback, VideoAsset} from "~/core/types/asset";
import {ASSET_TYPE} from "~/core/enums/asset";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

/**
 * @description
 * This manager is responsible for download all assets need by the application and provide in any component
 *
 * @example
 * // Register an gltf asset
 * AssetsManager.registerGltf('name of the gltf asset', 'url of the asset')
 *
 * // Load all assets after register
 * AssetsManager.load()
 *
 * // Retrieve a gltf asset
 * AssetsManager.getGltf('name of the gltf asset')
 */
class AssetsManager {
  // - PROPERTIES
  public _assetSource: Array<AssetSource>
  private _imageAssets: Array<ImageAsset>
  private _videoAssets: Array<VideoAsset>
  private _gltfAssets: Array<GltfAsset>
  private _fbxAssets: Array<FbxAsset>
  private _audioAssets: Array<AudioAsset>
  private _isLocalMode: boolean = false

  // -- Loaders
  private _gltfLoader: GLTFLoader
  private _fbxLoader: FBXLoader

  // -- Events
  private _onProgressCallback: ProgressCallback
  private _onSuccessCallback: () => void
  private _onErrorCallback: () => void

  constructor() {
    this._assetSource = []
    this._imageAssets = []
    this._videoAssets = []
    this._gltfAssets = []
    this._fbxAssets = []
    this._audioAssets = []

    this._gltfLoader = new GLTFLoader()
    this._fbxLoader = new FBXLoader()

    this._onProgressCallback = function () {}
    this._onSuccessCallback = function () {}
    this._onErrorCallback = function () {}
  }

  /**
   * Load all assets from sources registered
   */
  public async load() {
    let loadedAssets = 0

    for (const source of this._assetSource) {
      await this._loadAssetFromSource(source)
      loadedAssets++
      this._onProgressCallback(loadedAssets, this._assetSource.length)
    }

    this._onSuccessCallback()
  }

  public onProgress(callback: ProgressCallback) {
    this._onProgressCallback = callback

    return this
  }

  public enableLocalMode() {
    this._isLocalMode = true

    return this
  }

  /**
   * Register new gltf asset source
   */
  public registerGltf(name: string, url: string, localUrl: string | null = null) {
    this._registerSource(name, ASSET_TYPE.GLTF, url, localUrl)

    return this
  }

  /**
   * Register new video asset source
   */
  public registerVideo(name: string, url: string, localUrl: string | null = null) {
    this._registerSource(name, ASSET_TYPE.VIDEO, url, localUrl)

    return this
  }

  /**
   * Register new image asset source
   */
  public registerImage(name: string, url: string, localUrl: string | null = null) {
    this._registerSource(name, ASSET_TYPE.IMAGE, url, localUrl)

    return this
  }

  /**
   * Register new image asset source
   */
  public registerFbx(name: string, url: string, localUrl: string | null = null) {
    this._registerSource(name, ASSET_TYPE.FBX, url, localUrl)

    return this
  }

  /**
   * Register new image asset source
   */
  public registerAudio(name: string, url: string, localUrl: string | null = null) {
    this._registerSource(name, ASSET_TYPE.AUDIO, url, localUrl)

    return this
  }

  /**
   * Retrieve gltf asset loaded
   */
  public getGltf(name: string): GltfAsset {
    const gltf = this._gltfAssets.find(gltf => gltf.source.name === name)
    if (!gltf) throw new Error(`Gltf asset ${name} is not founded`)
    // let obj = Object.create(gltf)
    return gltf //obj //gltf
  }

  /**
   * Retrieve image asset loaded
   */
  public getImage(name: string): ImageAsset {
    const image =  this._imageAssets.find(gltf => gltf.source.name === name) || null
    if (!image) throw new Error(`Image asset ${name} is not founded`)

    return image
  }

  /**
   * Retrieve video asset loaded
   */
  public getVideo(name: string): VideoAsset {
    const video = this._videoAssets.find(video => video.source.name === name) || null
    if (!video) throw new Error(`Video asset ${name} is not founded`)

    return video
  }

  /**
   * Retrieve fbx asset loaded
   */
  public getFbx(name: string): FbxAsset {
    const fbx = this._fbxAssets.find(object => object.source.name === name) || null
    if (!fbx) throw new Error(`Fbx asset ${name} is not founded`)

    return fbx
  }

  /**
   * Retrieve audio asset loaded
   */
  public getAudio(name: string): AudioAsset {
    const audio = this._audioAssets.find(audio => audio.source.name === name) || null
    if (!audio) throw new Error(`Audio asset ${name} is not founded`)

    return audio
  }

  /**
   * Register new asset source
   */
  public _registerSource(name: string, type: ASSET_TYPE, url: string, localUrl: string | null) {
    const source: AssetSource = {
      name: name,
      type: type,
      url: (this._isLocalMode && localUrl) ? `/models/${localUrl}`  : url
    }
    this._assetSource.push(source)
  }

  /**
   * Handle load asset logic
   */
  private async _loadAssetFromSource(source: AssetSource) {
    try {
      switch (source.type) {
        case ASSET_TYPE.GLTF:
          await this._loadGltfAsset(source)
          break
        case ASSET_TYPE.IMAGE:
          await this._loadImageAsset(source)
          break
        case ASSET_TYPE.VIDEO:
          await this._loadVideoAsset(source)
          break
        case ASSET_TYPE.FBX:
          await this._loadFbx(source)
          break
        case ASSET_TYPE.AUDIO:
          await this._loadAudio(source)
          break;
      }
    } catch (error) {
      this._onErrorCallback()
    }
  }

  /**
   * Gltf loader handler
   */
  private async _loadGltfAsset(source: AssetSource): Promise<void> {
    return new Promise<void>(resolve => {
      this._gltfLoader.load(source.url, gltf => {
        gltf.scene.name = source.name
        this._gltfAssets.push({source, data: gltf})
        resolve()
      })
    })
  }

  /**
   * Image loader handler
   */
  private async _loadImageAsset(source: AssetSource): Promise<void> {
    return new Promise<void>(resolve => {
      const image = new Image()
      image.src = source.url
      this._imageAssets.push({source, data: image})
      resolve()
    })
  }

  /**
   * Video loader handler
   */
  private async _loadVideoAsset(source: AssetSource) {
    const response = await fetch(source.url)
    const video = document.createElement('video')
    const videoData = await response.blob()
    video.src = URL.createObjectURL(videoData)
    this._videoAssets.push({source, data: video})
  }

  /**
   * Fbx loader handler
   */
  private async _loadFbx(source: AssetSource) {
    return new Promise<void>(resolve => {
      this._fbxLoader.load(source.url, object => {
        object.name = source.name
        this._fbxAssets.push({source, data: object})
        resolve()
      })
    })
  }

  /**
   * Audio loader handler
   */
  private async _loadAudio(source: AssetSource) {
    const response = await fetch(source.url)
    const audio = new Audio()
    const audioData = await response.blob()
    audio.src = URL.createObjectURL(audioData)
    this._audioAssets.push({source, data: audio})
  }

}

const instance = new AssetsManager()

export default instance
