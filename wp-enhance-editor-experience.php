<?php
/**
 * Plugin Name: WP Enhance Editor Experience
 * Description: Manage various block editor settings and features
 * Version: 1.0.0
 * Author: Ronak Ganatra
 */

if (!defined('ABSPATH')) exit;

class WPBlockEditorSettingsManager {
    private $options;
    
    public function __construct() {
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_assets'));
        add_action('rest_api_init', array($this, 'register_settings_api'));
        
        // Initialize settings
        $this->options = get_option('block_editor_settings_manager', array(
            'disable_patterns' => false,
            'disable_template_editor' => false,
            'disable_code_editor' => false,
            'max_upload_size' => 0,
            'default_image_size' => 'medium',
            'disable_openverse' => false,
            'disable_font_library' => false,
            'disable_inspector_tabs' => false,
            'disable_block_directory' => false,
            'disable_remote_patterns' => false
        ));
        
        $this->init_settings();
    }
    
    public function init_settings() {
        if ($this->options['disable_patterns']) {
            add_action('after_setup_theme', array($this, 'disable_patterns'));
        }
        
        if ($this->options['disable_template_editor']) {
            add_action('after_setup_theme', array($this, 'disable_template_editor'));
        }
        
        if ($this->options['disable_code_editor']) {
            add_filter('block_editor_settings_all', array($this, 'disable_code_editor'), 10, 2);
        }
        
        if ($this->options['max_upload_size'] > 0) {
            add_filter('block_editor_settings_all', array($this, 'set_max_upload_size'), 10, 2);
        }
        
        if ($this->options['default_image_size']) {
            add_filter('block_editor_settings_all', array($this, 'set_default_image_size'));
        }
        
        if ($this->options['disable_openverse']) {
            add_filter('block_editor_settings_all', array($this, 'disable_openverse'));
        }
        
        if ($this->options['disable_font_library']) {
            add_filter('block_editor_settings_all', array($this, 'disable_font_library'));
        }
        
        if ($this->options['disable_inspector_tabs']) {
            add_filter('block_editor_settings_all', array($this, 'disable_inspector_tabs'));
        }
        
        if ($this->options['disable_block_directory']) {
            remove_action('enqueue_block_editor_assets', 'wp_enqueue_editor_block_directory_assets');
        }
        
        if ($this->options['disable_remote_patterns']) {
            add_filter('should_load_remote_block_patterns', '__return_false');
        }
    }
    
    // Implementation of all setting functions
    public function disable_patterns() {
        remove_theme_support('core-block-patterns');
    }
    
    public function disable_template_editor() {
        remove_theme_support('block-templates');
    }
    
    public function disable_code_editor($settings, $context) {
        $settings['codeEditingEnabled'] = false;
        return $settings;
    }
    
    public function set_max_upload_size($settings, $context) {
        if (!empty($context->post)) {
            $settings['maxUploadFileSize'] = $this->options['max_upload_size'];
        }
        return $settings;
    }
    
    public function set_default_image_size($settings) {
        $settings['imageDefaultSize'] = $this->options['default_image_size'];
        return $settings;
    }
    
    public function disable_openverse($settings) {
        $settings['enableOpenverseMediaCategory'] = false;
        return $settings;
    }
    
    public function disable_font_library($settings) {
        $settings['fontLibraryEnabled'] = false;
        return $settings;
    }
    
    public function disable_inspector_tabs($settings) {
        $settings['blockInspectorTabs'] = array('default' => false);
        return $settings;
    }
    
    // Admin menu and assets
    public function add_admin_menu() {
        add_options_page(
            'Block Editor Settings',
            'Block Editor Settings',
            'manage_options',
            'block-editor-settings',
            array($this, 'render_admin_page')
        );
    }
    
    public function render_admin_page() {
        echo '<div id="block-editor-settings-app"></div>';
    }
    
    public function enqueue_admin_assets($hook) {
        if ($hook !== 'settings_page_block-editor-settings') return;
        
        wp_enqueue_script(
            'block-editor-settings-js',
            plugins_url('build/index.js', __FILE__),
            array('wp-element', 'wp-components', 'wp-api-fetch'),
            '1.0.0',
            true
        );
        
        wp_enqueue_style(
            'block-editor-settings-css',
            plugins_url('build/index.css', __FILE__),
            array('wp-components'),
            '1.0.0'
        );
    }
    
    // REST API endpoints
    public function register_settings_api() {
        register_rest_route('block-editor-settings/v1', '/settings', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_settings'),
                'permission_callback' => array($this, 'check_permissions'),
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'update_settings'),
                'permission_callback' => array($this, 'check_permissions'),
            ),
        ));
    }
    
    public function get_settings() {
        return rest_ensure_response($this->options);
    }
    
    public function update_settings($request) {
        $settings = $request->get_json_params();
        update_option('block_editor_settings_manager', $settings);
        $this->options = $settings;
        return rest_ensure_response($settings);
    }
    
    public function check_permissions() {
        return current_user_can('manage_options');
    }
}

new WPBlockEditorSettingsManager();