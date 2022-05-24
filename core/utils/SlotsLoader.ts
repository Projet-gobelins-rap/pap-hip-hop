import { Group, Object3D, Mesh } from "three"

export default class SlotsLoader {
    private _scene: any
    public slots: Map<string, object>
    // public populateSlots: () => void

    public static populateSingleSlots(slot: Object3D, baseObject: Object3D | Group | Mesh): void {
        slot.children = []
        slot.add(baseObject)
    }

    public static populateSlots(slots: Object3D[], baseObject: Object3D | Group | Mesh): void  {
        slots.forEach(object => {
            // -Lead- : dispose ? remove ?
            object.children = []
            object.add(baseObject.clone())
        });
    }
}