// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import classNames from 'classnames';
import React from 'react';
import {DraggableProvidedDragHandleProps} from 'react-beautiful-dnd';
import {useIntl} from 'react-intl';

import {wrapEmojis} from 'utils/emoji_utils';

type StaticProps = {
    children?: React.ReactNode;
    displayName: string;
}

export const SidebarCategoryHeaderStatic = React.forwardRef((props: StaticProps, ref?: React.Ref<HTMLDivElement>) => {
    return (
        <div className='SidebarChannelGroupHeader SidebarChannelGroupHeader--static'>
            <div
                ref={ref}
                className='SidebarChannelGroupHeader_groupButton'
            >
                <div className='SidebarChannelGroupHeader_text'>
                    {wrapEmojis(props.displayName)}
                </div>
                {props.children}
            </div>
        </div>
    );
});
SidebarCategoryHeaderStatic.displayName = 'SidebarCategoryHeaderStatic';

type Props = StaticProps & {
    dragHandleProps?: DraggableProvidedDragHandleProps;
    isCollapsed: boolean;
    isCollapsible: boolean;
    isDragging?: boolean;
    isDraggingOver?: boolean;
    muted: boolean;
    onClick: () => void;
}

export const SidebarCategoryHeader = React.forwardRef((props: Props, ref?: React.Ref<HTMLButtonElement>) => {
    const {formatMessage} = useIntl();

    const Collapsed = formatMessage({
        id: 'sidebar_left.channel.group_header_state.collapsed',
        defaultMessage: 'is collapsed'});

    const Expanded = formatMessage({
        id: 'sidebar_left.channel.group_header_state.expanded',
        defaultMessage: 'is expanded'});

    const [headerState, setHeaderState] = React.useState(Expanded);

    function setCollapsed() {
        if (props.isCollapsed) {
            setHeaderState(Expanded);
        } else {
            setHeaderState(Collapsed);
        }
    }

    function handleState() {
        props.onClick();
        setCollapsed();
    }

    const channelHeader = props.displayName;

    const sidebarHeader = formatMessage({
        id: 'sidebar_left.channel.group_header_aria',
        defaultMessage: '{channelHeader}{headerState}'}, {channelHeader, headerState});

    return (
        <div
            className={classNames('SidebarChannelGroupHeader', {
                muted: props.muted,
                dragging: props.isDragging,
            })}
        >
            <button
                ref={ref}
                className={classNames('SidebarChannelGroupHeader_groupButton')}
                aria-label={sidebarHeader}
                onClick={handleState}
            >
                <i
                    className={classNames('icon icon-chevron-down', {
                        'icon-rotate-minus-90': props.isCollapsed,
                        'hide-arrow': !props.isCollapsible,
                    })}
                />
                <div
                    className='SidebarChannelGroupHeader_text'
                    {...props.dragHandleProps}
                >
                    {wrapEmojis(props.displayName)}
                </div>
            </button>
            {props.children}
        </div>
    );
});
SidebarCategoryHeader.defaultProps = {
    isCollapsible: true,
    isDragging: false,
    isDraggingOver: false,
};
SidebarCategoryHeader.displayName = 'SidebarCategoryHeader';
