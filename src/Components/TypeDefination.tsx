export type nodeTypes = { id: String | any, content: String | any }

export type DragableTypes = {
    columnId: any;
    column: { items: nodeTypes[] }
}