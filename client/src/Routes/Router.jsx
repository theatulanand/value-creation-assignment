import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Private } from '../components/Private'
import { Illustration } from '../Pages/Illustration'
import Login from '../Pages/Login'
import { PolicyCalculation } from '../Pages/PolicyCalculation'
import Register from '../Pages/Register'

export const Router = () => {
    return (
        <Routes>

            <Route path="/" element={<Private><PolicyCalculation /></Private>}></Route>
            <Route path="/illustration" element={<Private><Illustration /></Private>}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    )
}
