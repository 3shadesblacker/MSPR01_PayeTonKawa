import React, { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Link, Outlet } from "react-router-dom";
import { mdiCoffee,  mdiLogin } from '@mdi/js';
import Icon from '@mdi/react'

const Navbar = () => {
    const menu = useRef(null);
    const toast = useRef(null);
    const items = [
        {
            label: 'Options',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh',
                    template: (item, options) => {
                        return (
                            /* custom element */
                           <Link to="coffee">
                            <span><Icon path={mdiCoffee} size={1}/></span>
                            <span class="p-menuitem-text">Coffee</span>
                           </Link>
                        );
                    }
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times',
                    template: (item, options) => {
                        return (
                            /* custom element */
                           <Link to="login">
                            <span><Icon path={mdiLogin} size={1}/></span>
                            <span class="p-menuitem-text">Login</span>
                           </Link>
                        );
                    }
                }
            ]
        },
    ];

    return (
        <div>
            <Toast ref={toast}></Toast>

            <div className="card">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
            <Outlet />
        </div>
    );
}

export default Navbar;