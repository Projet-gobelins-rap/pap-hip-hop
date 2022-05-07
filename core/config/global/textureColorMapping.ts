import { Vector2 } from 'three'
import { TEXTURE_COLOR } from "../../enums";

interface TextureColorsSpec {
    offset: Vector2,
    repeat: Vector2
}

export function getTextureColorSpec(textureColor: string): TextureColorsSpec {
    switch (textureColor) {
        case TEXTURE_COLOR.Orange:
            return { offset: new Vector2(0, 0), repeat: new Vector2(0.5, 0.5) }
        case TEXTURE_COLOR.Purple:
            return { offset: new Vector2(0.5, 0), repeat: new Vector2(0.5, 0.5) }
        case TEXTURE_COLOR.White:
            return { offset: new Vector2(0, 0.5), repeat: new Vector2(0.5, 0.5) }
        case TEXTURE_COLOR.Green:
            return { offset: new Vector2(0.5, 0.5), repeat: new Vector2(0.5, 0.5) }
        default:
            return { offset: new Vector2(0.5, 0), repeat: new Vector2(0.5, 0.5) }
    }
}