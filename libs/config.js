import express from 'express';
import dotenv from 'dotenv';

export default function config(app) {
    app.use(express.json());
    dotenv.config();
}