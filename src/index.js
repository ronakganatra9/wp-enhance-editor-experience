import { createRoot,useState, useEffect } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
import { __experimentalHeading as Heading, Panel, PanelBody, PanelRow, ToggleControl, TextControl, SelectControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';

function SettingsApp() {
    const [settings, setSettings] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        apiFetch({ path: '/block-editor-settings/v1/settings' })
            .then(response => setSettings(response));
    }, []);

    const updateSettings = async (newSettings) => {
        setIsSaving(true);
        try {
            const response = await apiFetch({
                path: '/block-editor-settings/v1/settings',
                method: 'POST',
                data: newSettings
            });
            setSettings(response);
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
        setIsSaving(false);
    };

    if (!settings) return <div>Loading...</div>;

    return (
        <>
            <Heading level={1}>
                Block Editor Settings
            </Heading>
            <Panel>
                <PanelBody>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Pattern Directory"
                            checked={settings.disable_patterns}
                            onChange={(value) => updateSettings({ ...settings, disable_patterns: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Template Editor"
                            checked={settings.disable_template_editor}
                            onChange={(value) => updateSettings({ ...settings, disable_template_editor: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Code Editor"
                            checked={settings.disable_code_editor}
                            onChange={(value) => updateSettings({ ...settings, disable_code_editor: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <TextControl
                            label="Max Upload File Size (bytes)"
                            type="number"
                            value={settings.max_upload_size}
                            onChange={(value) => updateSettings({ ...settings, max_upload_size: parseInt(value) })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <SelectControl
                            label="Default Image Size"
                            value={settings.default_image_size}
                            options={[
                                { label: 'Thumbnail', value: 'thumbnail' },
                                { label: 'Medium', value: 'medium' },
                                { label: 'Large', value: 'large' },
                                { label: 'Full Size', value: 'full' }
                            ]}
                            onChange={(value) => updateSettings({ ...settings, default_image_size: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Openverse"
                            checked={settings.disable_openverse}
                            onChange={(value) => updateSettings({ ...settings, disable_openverse: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Font Library"
                            checked={settings.disable_font_library}
                            onChange={(value) => updateSettings({ ...settings, disable_font_library: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Inspector Tabs"
                            checked={settings.disable_inspector_tabs}
                            onChange={(value) => updateSettings({ ...settings, disable_inspector_tabs: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Block Directory"
                            checked={settings.disable_block_directory}
                            onChange={(value) => updateSettings({ ...settings, disable_block_directory: value })}
                        />
                    </PanelRow>
                    <PanelRow>
                        <ToggleControl
                            label="Disable Remote Patterns"
                            checked={settings.disable_remote_patterns}
                            onChange={(value) => updateSettings({ ...settings, disable_remote_patterns: value })}
                        />
                    </PanelRow>
                </PanelBody>
                {isSaving && <div>Saving...</div>}
            </Panel>
        </>
    );
}

domReady( () => {
    const root = createRoot(
        document.getElementById( 'block-editor-settings-app' )
    );

    root.render( <SettingsApp /> );
} );