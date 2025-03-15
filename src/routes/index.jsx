import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';
const Loader = lazy(() => import('../components/Loader.jsx'));
const Login = lazy(() => import('../views/Auth/Login.jsx'));
const Dashboard = lazy(() => import('../views/dashboard/Index.jsx'));
const PermissionsIndex = lazy(() => import('../views/Permissions/Index.jsx'));
const RolesIndex = lazy(() => import('../views/Roles/Index.jsx'));
const RoleCreate = lazy(() => import('../views/Roles/Create.jsx'));
const RoleEdit = lazy(() => import('../views/Roles/Edit.jsx'));

export default function RoutesIndex() {

    return (
        <Routes>

            {/* route "/" */}
            <Route
                path="/"
                element={
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                }
            />

            {/* private route "/dashboard" */}
            <Route
                path="/dashboard"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <Dashboard />
                        </PrivateRoutes>
                    </Suspense>
                    
                }
            />

            {/* private route "/permissions" */}
            <Route
                path="/permissions"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <PermissionsIndex />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

            {/* private route "/roles" */}
            <Route
                path="/roles"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <RolesIndex />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

            {/* private route "/roles/create" */}
            <Route
                path="/roles/create"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <RoleCreate />
                        </PrivateRoutes>
                    </Suspense>
                }
            />

            {/* private route "/roles/edit/:id" */}
            <Route
                path="/roles/edit/:id"
                element={
                    <Suspense fallback={<Loader />}>
                        <PrivateRoutes>
                            <RoleEdit />
                        </PrivateRoutes>
                    </Suspense>
                }
            />
        </Routes>
    )
}