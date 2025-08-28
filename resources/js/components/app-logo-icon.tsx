import { SVGAttributes } from 'react';
import { usePage } from "@inertiajs/react";

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    const { setup } = usePage().props;
    return (
        <img src={setup.icon} alt="" />
    );
}
