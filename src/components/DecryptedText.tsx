
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTextScramble } from '../hooks/useTextScramble';

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: 'view' | 'hover';
    [key: string]: any;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = 'start',
    useOriginalCharsOnly = false,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
    className = '',
    parentClassName = '',
    encryptedClassName = '',
    animateOn = 'view',
    ...props
}: DecryptedTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    
    const {
        displayText,
        isScrambling,
        revealedIndices,
        isActive,
        observeElement,
        toggleAnimation
    } = useTextScramble({
        text,
        speed,
        maxIterations,
        sequential,
        revealDirection,
        useOriginalCharsOnly,
        characters,
        animateOn
    });
    
    // Set up the intersection observer for view-triggered animations
    const handleRef = (ref: HTMLSpanElement | null) => {
        containerRef.current = ref;
        observeElement(ref);
    };
    
    // Event handlers for hover-triggered animations
    const hoverProps = animateOn === 'hover'
        ? {
            onMouseEnter: () => toggleAnimation(true),
            onMouseLeave: () => toggleAnimation(false),
        }
        : {};
    
    return (
        <motion.span
            ref={handleRef}
            className={`inline-block whitespace-pre-wrap ${parentClassName}`}
            {...hoverProps}
            {...props}
        >
            <span className="sr-only">{displayText}</span>

            <span aria-hidden="true">
                {displayText.split('').map((char, index) => {
                    const isRevealedOrDone =
                        revealedIndices.has(index) || !isScrambling || !isActive;

                    return (
                        <span
                            key={index}
                            className={isRevealedOrDone ? className : encryptedClassName}
                        >
                            {char}
                        </span>
                    );
                })}
            </span>
        </motion.span>
    );
}
