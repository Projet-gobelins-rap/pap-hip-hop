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
    public static generateBuilding(slots: Object3D[], buildingVariations: Object3D[]): void  {
    // public static generateBuilding(slots: Object3D[], buildingVariations: Object3D): void  {
        slots.forEach(slot => {
            const params = slot.name.split('_')
            slot.children = []
          
            switch (params[3]) {
                case "1":
                    slot.add(buildingVariations[0].clone())
                    break;
                case "2":
                    slot.add(buildingVariations[1].clone())
                    break;
                case "3":
                    slot.add(buildingVariations[2].clone())
                    break;
                case "4":
                    slot.add(buildingVariations[3].clone())
                    break;
                default:
                    break;
            }
        });
    }
}