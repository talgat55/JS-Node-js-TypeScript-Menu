import express, {Request, Response} from 'express';
import *  as ItemService from './items.service';
import {BaseItem, Item} from "./item.interface";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();
        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    try {
        const item: Item = await ItemService.find(id);

        if (item) {
            res.status(200).send(item);
        }
        res.status(404).send('Item not found');
    } catch (e) {
        res.status(500).send(e.message);
    }
})

itemsRouter.post('/', async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;
        const newItem = await ItemService.create(item);
        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

itemsRouter.put("/", async (req: Request, res: Response) => {
    const id: number = +req.params.id;

    try {
        const itemUpdate: Item = req.body;
        const existingItem: Item = await ItemService.find(id);

        if (existingItem) {
            const updateItem = await ItemService.update(id, itemUpdate);
            return res.status(200).json(updateItem)
        }

        const newItem = await ItemService.create(itemUpdate);
        res.status(201).json(newItem);
    } catch (e) {
        res.status(500).send(e.message);
    }
})

itemsRouter.delete("/:id" , async (req:Request , res: Response) =>{
    try{
        const id: number = +req.params.id;
        await  ItemService.remove(id);
        res.status(204);
    }catch (e) {
        res.status(500).send(e.message);
    }
})
