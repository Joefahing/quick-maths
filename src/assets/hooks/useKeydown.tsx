import { useEffect } from "react";

export default function useKeydown(key: string, onKeydown: () => void)
{
    const handleKeydown = (event: KeyboardEvent) =>
    {
        if (event.key === key) onKeydown();
    }
    
    useEffect(() =>
    {
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, []);
}