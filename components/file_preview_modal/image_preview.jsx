// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from "prop-types";
import React from "react";

import {
    getFilePreviewUrl,
    getFileDownloadUrl,
} from "mattermost-redux/utils/file_utils";

import "./image_preview.scss";

// imports for zooming and panning
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ArrowExpandAllIcon } from "@mattermost/compass-icons/components";
import { HandRightIcon } from "@mattermost/compass-icons/components";
import { ChevronDownIcon } from "@mattermost/compass-icons/components";

export default function ImagePreview({ fileInfo, canDownloadFiles }) {
    const isExternalFile = !fileInfo.id;

    let fileUrl;
    let previewUrl;
    if (isExternalFile) {
        fileUrl = fileInfo.link;
        previewUrl = fileInfo.link;
    } else {
        fileUrl = getFileDownloadUrl(fileInfo.id);
        previewUrl = fileInfo.has_preview_image
            ? getFilePreviewUrl(fileInfo.id)
            : fileUrl;
    }

    if (!canDownloadFiles) {
        return <img src={previewUrl} />;
    }
    // zooming functionality are here
    const [zoom, setZoom] = React.useState("zoom1");

    function zoom1(zoomOut) {
        setZoom("zoom1");
        setZoomValue("Automatic Zoom");
        zoomOut();
        zoomOut();
        zoomOut();
        zoomOut();
    }
    function zoom1_5() {
        setZoom("zoom1-5");
        setZoomValue("150 %");
    }
    function zoom2(zoomIn) {
        setZoom("zoom2");
        zoomIn();
        setZoomValue("200 %");
    }
    function zoom2_5(zoomIn) {
        setZoom("zoom2-5");
        zoomIn();
        setZoomValue("250 %");
    }
    function zoom3(zoomIn) {
        setZoom("zoom3");
        zoomIn();
        setZoomValue("300 %");
    }

    function Increment(zoomIn) {
        if (zoom === "zoom1") {
            zoom1_5();
        } else if (zoom === "zoom1-5") {
            zoom2(zoomIn);
        } else if (zoom === "zoom2") {
            zoom2_5(zoomIn);
        } else if (zoom === "zoom2-5") {
            zoom3(zoomIn);
        }
    }

    function Zoom1(zoomOut) {
        setZoom("zoom1");
        zoomOut();
        setZoomValue("Automatic Zoom");
    }
    function Zoom1_5(zoomOut) {
        setZoom("zoom1-5");
        zoomOut();
        setZoomValue("150 %");
    }
    function Zoom2(zoomOut) {
        setZoom("zoom2");
        zoomOut();
        setZoomValue("200 %");
    }
    function Zoom2_5(zoomOut) {
        setZoom("zoom2-5");
        zoomOut();
        setZoomValue("250 %");
    }

    function Decrement(zoomOut) {
        if (zoom === "zoom3") {
            Zoom2_5(zoomOut);
        } else if (zoom === "zoom2-5") {
            Zoom2(zoomOut);
        } else if (zoom === "zoom2") {
            Zoom1_5(zoomOut);
        } else if (zoom === "zoom1-5") {
            Zoom1(zoomOut);
        }
    }

    // expand button functonality are here

    function Expand(zoomIn, zoomOut) {
        if (zoom === "zoom1") {
            zoom2(zoomIn);
        } else if (zoom === "zoom2") {
            Zoom1(zoomOut);
        }
    }

    // dropdown functionality here

    const [zoomValue, setZoomValue] = React.useState("Automatic Zoom");

    const [isDropDown, setIsDropDown] = React.useState(false);

    function zoom_1_5() {
        zoom1_5();
        setIsDropDown(false);
    }
    function zoom_2(zoomIn) {
        zoom2(zoomIn);
        setIsDropDown(false);
    }
    function zoom_2_5(zoomIn) {
        zoom2_5(zoomIn);
        setIsDropDown(false);
    }
    function zoom_3(zoomIn) {
        zoom3(zoomIn);
        setIsDropDown(false);
    }
    function zoom_1(zoomOut) {
        zoom1(zoomOut);
        setIsDropDown(false);
    }
    return (
        <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
        >
            {({ zoomIn, zoomOut }) => (
                <React.Fragment>
                    <div className="image-preview-outer">
                        <div className="action-bar">
                            <button
                                className="minus-button"
                                onClick={() => Decrement(zoomOut)}
                            >
                                -
                            </button>
                            <button
                                className="plus-button"
                                onClick={() => Increment(zoomIn)}
                            >
                                +
                            </button>

                            <div className="dropdown-custom">
                                <div
                                    className="drop-down-face"
                                    onClick={() => setIsDropDown(true)}
                                >
                                    <div className="zoom-value-text">
                                        {zoomValue}
                                    </div>

                                    <div className="drop-icon">
                                        <ChevronDownIcon
                                            size={18}
                                            color="#ffffff"
                                        />
                                    </div>
                                </div>
                                {isDropDown && (
                                    <div className="drop-content">
                                        <div
                                            className="drop-text"
                                            onClick={() => zoom_1(zoomOut)}
                                        >
                                            Automatic Zoom
                                        </div>
                                        <div
                                            className="drop-text"
                                            onClick={() => zoom_1_5(zoomIn)}
                                        >
                                            150 %
                                        </div>
                                        <div
                                            className="drop-text"
                                            onClick={() => zoom_2(zoomIn)}
                                        >
                                            200 %
                                        </div>
                                        <div
                                            className="drop-text"
                                            onClick={() => zoom_2_5(zoomIn)}
                                        >
                                            250 %
                                        </div>
                                        <div
                                            className="drop-text"
                                            onClick={() => zoom_3(zoomIn)}
                                        >
                                            300 %
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                className="expand-icon"
                                onClick={() => Expand(zoomIn, zoomOut)}
                            >
                                <ArrowExpandAllIcon
                                    size={18}
                                    color="currentcolor"
                                />
                            </button>

                            <button className="hand-right">
                                <HandRightIcon size={18} color="#FFFFFF" />
                            </button>
                        </div>
                        <a className="image_preview" href="#">
                            <TransformComponent>
                                <img
                                    className={`image_preview__image ${zoom}`}
                                    data-testid="imagePreview"
                                    alt={"preview url image"}
                                    src={previewUrl}
                                />
                            </TransformComponent>
                        </a>
                    </div>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
}

ImagePreview.propTypes = {
    fileInfo: PropTypes.object.isRequired,
    canDownloadFiles: PropTypes.bool.isRequired,
};
