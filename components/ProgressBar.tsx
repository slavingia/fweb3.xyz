type ProgressBarProps = {
    progress: number;
    showLabel: boolean;
    appendLabelText: string;
};

const ProgressBar = ({ progress, showLabel, appendLabelText }: ProgressBarProps) => {
    return (
        <div className="progress-container">
            <div className="progress-inner" style={{ width: `${progress}%` }}></div>
            {showLabel ? <span className="progress-label">{progress}{appendLabelText}</span> : ''}
        </div>
    );
};

export default ProgressBar;