import React from 'react';
import './Content.css'; // Assuming you have a separate CSS file for styling

const Content = () => {
    return (
        <div className="content">
            <div className="section import-section">
                <h3>Import</h3>
                <div className="input-group">
                    <label>Select Format:</label>
                    <select>
                        <option value="">Select format</option>
                        <option value="csv">CSV</option>
                        <option value="xls">XLS</option>
                    </select>
                    <button className="download-button">Download</button>
                </div>
            </div>
            <div className="section export-section">
                <h3>Export</h3>
                <p>Only xls Format <a href="/template.xls">click here</a> to download the template</p>
                <div className="input-group">
                    <input type="file" />
                    <button className="upload-button">Upload</button>
                </div>
            </div>
        </div>
    );
};

export default Content;
