const express = require('express');
const router = express.Router()
const Note = require('../models/note');
const { modelNames } = require('mongoose');
router.get('/',async (req,res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
    });
    router.post('/', async (req, res) => {
        const note = new Note({
            title: req.body.title,
            content: req.body.content
        });
    
        try {
            const newNote = await note.save();
            res.status(201).json(newNote);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });
    
    // Удаление заметки по ID
    router.delete('/:id', async (req, res) => {
        try {
            await Note.findByIdAndDelete(req.params.id);
            res.json({ message: 'Заметка удалена' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
    
    module.exports = router;