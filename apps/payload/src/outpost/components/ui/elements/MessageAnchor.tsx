import DoneAllIcon from '@mui/icons-material/DoneAll';
import LinkIcon from '@mui/icons-material/Link';
import { useHashParser } from 'outpost/hooks/useHashParser';
import { Tooltip } from 'components/display';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useOutpostState } from 'outpost/state/useOutpostState';

export interface MessageAnchorProps {
    mId: number;
    tabTitle: string | undefined;
    children: ReactNode;
}

export function MessageAnchor({ mId, tabTitle, children }: MessageAnchorProps) {
    const { messageId } = useHashParser();
    const { getParam } = useOutpostState();
    const currentUrl = getParam({ title: 'stateUrl' })?.value;
    //console.log(currentUrl)
    const [hover, setHover] = useState(false);
    const [ok, setOk] = useState(false);
    // https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element
    const myRef = useRef(null);
    useEffect(() => {
        if (myRef && messageId === mId) (myRef as any).current.scrollIntoView();
        // eslint-disable-next-line
    }, []);
    return (
        <span
            ref={myRef}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <span
                style={{
                    position: 'absolute',
                    left: '3px',
                    width: '25px',
                    height: '20px',
                    cursor: 'pointer',
                }}>
                {hover && ok && <DoneAllIcon />}
                {hover && !ok && (
                    <Tooltip content={'Click to copy link to clipboard'}>
                        <LinkIcon
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    `${window.location.origin}/lunaverse${
                                        currentUrl ? '?state=' + currentUrl : ''
                                    }#${tabTitle}#${mId}`
                                );
                                setOk(true);
                                setTimeout(() => {
                                    setOk(false);
                                }, 2000);
                            }}
                        />
                    </Tooltip>
                )}
            </span>
            {children}
        </span>
    );
}
