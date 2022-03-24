import MDEditor from '@uiw/react-md-editor';
import { useRO } from 'outpost/hooks/useRO';
import { useState } from 'react';
import xss from 'xss';

interface MarkdownEditorProps {
    val: any;
    updateFn: any;
}

export default function MarkdownEditor({ val, updateFn }: MarkdownEditorProps) {
    const [edit, setEdit] = useState(false);
    const ro = useRO();
    return (
        <div>
            <header
                onClick={() => {
                    if (!ro) setEdit(!edit);
                }}
                style={{ cursor: ro ? 'auto' : 'pointer' }}>
                Description:
            </header>
            {edit && !ro && (
                <MDEditor
                    value={val}
                    onChange={(changedValue: any) => {
                        updateFn(changedValue);
                    }}
                />
            )}
            {(!edit || ro) && <MDEditor.Markdown source={xss(val || '')} />}
        </div>
    );
}
