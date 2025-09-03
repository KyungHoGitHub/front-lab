import React, { useState, useCallback } from "react";
import { Gantt } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";

const EnhancedGantt = () => {
    // 태스크별 색상 팔레트
    const taskColors = {
        planning: "#3B82F6", // 파란색 - 기획
        analysis: "#10B981", // 초록색 - 분석
        development: "#F59E0B", // 주황색 - 개발
        frontend: "#8B5CF6", // 보라색 - 프론트엔드
        backend: "#EF4444", // 빨간색 - 백엔드
        database: "#06B6D4", // 청록색 - 데이터베이스
        testing: "#F97316", // 주황빨간색 - 테스팅
        deployment: "#84CC16", // 라임색 - 배포
        summary: "#6B7280", // 회색 - 요약
    };

    // 초기 태스크 데이터
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "프로젝트 기획",
            start: new Date(2024, 8, 1), // 2024년 9월 1일
            end: new Date(2024, 8, 7),
            duration: 7,
            progress: 100,
            type: "task",
            lazy: false,
            color: taskColors.planning,
            textColor: "#FFFFFF",
        },
        {
            id: 2,
            text: "요구사항 분석",
            start: new Date(2024, 8, 8),
            end: new Date(2024, 8, 14),
            duration: 7,
            progress: 80,
            type: "task",
            lazy: false,
            color: taskColors.analysis,
            textColor: "#FFFFFF",
        },
        {
            id: 3,
            text: "개발 단계",
            start: new Date(2024, 8, 15),
            end: new Date(2024, 9, 30),
            duration: 46,
            progress: 0,
            type: "summary",
            lazy: false,
            color: taskColors.summary,
            textColor: "#FFFFFF",
        },
        {
            id: 4,
            text: "프론트엔드 개발",
            start: new Date(2024, 8, 15),
            end: new Date(2024, 9, 15),
            duration: 31,
            progress: 45,
            parent: 3,
            type: "task",
            lazy: false,
            color: taskColors.frontend,
            textColor: "#FFFFFF",
        },
        {
            id: 5,
            text: "백엔드 개발",
            start: new Date(2024, 8, 20),
            end: new Date(2024, 9, 25),
            duration: 36,
            progress: 30,
            parent: 3,
            type: "task",
            lazy: false,
            color: taskColors.backend,
            textColor: "#FFFFFF",
        },
        {
            id: 6,
            text: "데이터베이스 설계",
            start: new Date(2024, 8, 15),
            end: new Date(2024, 8, 25),
            duration: 11,
            progress: 70,
            parent: 3,
            type: "task",
            lazy: false,
            color: taskColors.database,
            textColor: "#FFFFFF",
        },
        {
            id: 7,
            text: "테스팅",
            start: new Date(2024, 9, 26),
            end: new Date(2024, 10, 5),
            duration: 10,
            progress: 0,
            type: "task",
            lazy: false,
            color: taskColors.testing,
            textColor: "#FFFFFF",
        },
        {
            id: 8,
            text: "배포 및 런칭",
            start: new Date(2024, 10, 6),
            end: new Date(2024, 10, 12),
            duration: 7,
            progress: 0,
            type: "task",
            lazy: false,
            color: taskColors.deployment,
            textColor: "#FFFFFF",
        },
    ]);

    // 태스크 간 연결 관계
    const [links, setLinks] = useState([
        { id: 1, source: 1, target: 2, type: "e2s" }, // 기획 -> 요구사항 분석
        { id: 2, source: 2, target: 4, type: "e2s" }, // 요구사항 분석 -> 프론트엔드 개발
        { id: 3, source: 2, target: 6, type: "e2s" }, // 요구사항 분석 -> DB 설계
        { id: 4, source: 6, target: 5, type: "e2s" }, // DB 설계 -> 백엔드 개발
        { id: 5, source: 4, target: 7, type: "e2s" }, // 프론트엔드 개발 -> 테스팅
        { id: 6, source: 5, target: 7, type: "e2s" }, // 백엔드 개발 -> 테스팅
        { id: 7, source: 7, target: 8, type: "e2s" }, // 테스팅 -> 배포
    ]);

    // 스케일 설정 (시간 단위)
    const scales = [
        { unit: "month", step: 1, format: "yyyy년 MM월" },
        { unit: "week", step: 1, format: "MM/dd" },
    ];

    // 간트 차트 설정
    const config = {
        // 읽기 전용 모드 (편집 방지)
        readonly: false,
        // 그리드 컬럼 설정
        columns: [
            { name: "text", label: "작업명", width: 200, resize: true },
            { name: "start", label: "시작일", width: 100, align: "center" },
            { name: "end", label: "종료일", width: 100, align: "center" },
            { name: "duration", label: "기간", width: 60, align: "center" },
            { name: "progress", label: "진행률", width: 80, align: "center" },
        ],
        // 진행률 표시
        taskProgress: true,
        // 크리티컬 패스 표시
        criticalPath: true,
        // 오늘 날짜 표시
        todayMarker: true,
    };

    // 랜덤 색상 생성 함수
    const getRandomTaskColor = () => {
        const colors = Object.values(taskColors);
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // 태스크 추가 함수
    const addTask = useCallback(() => {
        const newTask = {
            id: Math.max(...tasks.map(t => t.id)) + 1,
            text: "새로운 작업",
            start: new Date(),
            end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7일 후
            duration: 7,
            progress: 0,
            type: "task",
            lazy: false,
            color: getRandomTaskColor(),
            textColor: "#FFFFFF",
        };
        setTasks([...tasks, newTask]);
    }, [tasks]);

    // 태스크 업데이트 핸들러
    const handleTaskUpdate = useCallback((id, task) => {
        setTasks(prevTasks =>
            prevTasks.map(t => t.id === id ? { ...t, ...task } : t)
        );
    }, []);

    // 태스크 삭제 핸들러
    const handleTaskDelete = useCallback((id) => {
        setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
        setLinks(prevLinks => prevLinks.filter(l => l.source !== id && l.target !== id));
    }, []);

    // 링크 추가 핸들러
    const handleLinkAdd = useCallback((link) => {
        const newLink = {
            ...link,
            id: Math.max(...links.map(l => l.id)) + 1,
        };
        setLinks([...links, newLink]);
    }, [links]);

    // 링크 삭제 핸들러
    const handleLinkDelete = useCallback((id) => {
        setLinks(prevLinks => prevLinks.filter(l => l.id !== id));
    }, []);

    // 프로젝트 통계 계산
    const projectStats = {
        totalTasks: tasks.filter(t => t.type === "task").length,
        completedTasks: tasks.filter(t => t.type === "task" && t.progress === 100).length,
        averageProgress: Math.round(
            tasks.filter(t => t.type === "task").reduce((sum, t) => sum + t.progress, 0) /
            tasks.filter(t => t.type === "task").length
        ),
        startDate: new Date(Math.min(...tasks.map(t => t.start.getTime()))),
        endDate: new Date(Math.max(...tasks.map(t => t.end.getTime()))),
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* 헤더 */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        프로젝트 관리 대시보드
                    </h1>
                    <p className="text-gray-600">
                        wx-react-gantt를 활용한 프로젝트 일정 관리
                    </p>
                </div>

                {/* 프로젝트 통계 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-sm font-medium text-gray-500">총 작업</h3>
                        <p className="text-2xl font-bold text-blue-600">{projectStats.totalTasks}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-sm font-medium text-gray-500">완료된 작업</h3>
                        <p className="text-2xl font-bold text-green-600">{projectStats.completedTasks}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-sm font-medium text-gray-500">평균 진행률</h3>
                        <p className="text-2xl font-bold text-orange-600">{projectStats.averageProgress}%</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-sm font-medium text-gray-500">프로젝트 기간</h3>
                        <p className="text-sm font-semibold text-purple-600">
                            {projectStats.startDate.toLocaleDateString()} ~ {projectStats.endDate.toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* 컨트롤 패널 */}
                <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={addTask}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            + 새 작업 추가
                        </button>
                        <button
                            onClick={() => {
                                const completedTasks = tasks.filter(t => t.progress === 100).length;
                                alert(`완료된 작업: ${completedTasks}개\n전체 작업: ${tasks.length}개\n완료율: ${Math.round((completedTasks/tasks.length) * 100)}%`);
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                            프로젝트 현황 보기
                        </button>
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">뷰 모드:</label>
                            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                                <option value="month">월간</option>
                                <option value="week">주간</option>
                                <option value="day">일간</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 간트 차트 */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <style>
                        {`
                            /* 간트 차트 태스크 바 커스터마이징 */
                            .wx_gantt_task_line .wx_gantt_task_content {
                                border-radius: 6px !important;
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
                                border: 1px solid rgba(255,255,255,0.2) !important;
                            }
                            
                            /* 각 태스크별 색상 적용 */
                            ${tasks.map(task => `
                                .wx_gantt_task_line[data-task-id="${task.id}"] .wx_gantt_task_content {
                                    background: ${task.color} !important;
                                    background: linear-gradient(135deg, ${task.color} 0%, ${task.color}dd 100%) !important;
                                }
                                .wx_gantt_task_line[data-task-id="${task.id}"] .wx_gantt_task_text {
                                    color: ${task.textColor || '#FFFFFF'} !important;
                                }
                                .wx_gantt_task_line[data-task-id="${task.id}"] .wx_gantt_task_progress {
                                    background: rgba(255,255,255,0.4) !important;
                                }
                            `).join('')}
                            
                            /* 진행률 바 스타일 */
                            .wx_gantt_task_progress {
                                border-radius: 4px !important;
                            }
                            
                            /* 선택된 태스크 강조 */
                            .wx_gantt_selected .wx_gantt_task_content {
                                box-shadow: 0 4px 12px rgba(0,0,0,0.25) !important;
                                transform: scale(1.02) !important;
                                transition: all 0.2s ease !important;
                                border: 2px solid #ffffff !important;
                            }
                            
                            /* 태스크 텍스트 스타일 */
                            .wx_gantt_task_text {
                                font-weight: 600 !important;
                                text-shadow: 0 1px 2px rgba(0,0,0,0.4) !important;
                                font-size: 12px !important;
                            }
                            
                            /* 마일스톤 스타일 */
                            .wx_gantt_task_milestone {
                                border-radius: 50% !important;
                                box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important;
                            }
                            
                            /* 요약 태스크 (그룹) 스타일 */
                            .wx_gantt_task_project .wx_gantt_task_content {
                                border-radius: 4px !important;
                                height: 20px !important;
                                background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%) !important;
                            }
                            
                            /* 그리드 라인 스타일 */
                            .wx_gantt_grid_scale .wx_gantt_grid_head_cell {
                                background: #f8fafc !important;
                                border-color: #e2e8f0 !important;
                                font-weight: 600 !important;
                            }
                            
                            /* 오늘 마커 스타일 */
                            .wx_gantt_today {
                                background: rgba(239, 68, 68, 0.1) !important;
                                border-left: 3px solid #ef4444 !important;
                            }
                            
                            /* 호버 효과 */
                            .wx_gantt_task_line:hover .wx_gantt_task_content {
                                opacity: 0.9 !important;
                                transform: translateY(-1px) !important;
                                transition: all 0.2s ease !important;
                            }
                            
                            /* 링크 라인 스타일 */
                            .wx_gantt_link_arrow {
                                stroke: #374151 !important;
                                stroke-width: 2 !important;
                            }
                            
                            /* 그리드 셀 스타일 */
                            .wx_gantt_grid_data .wx_gantt_grid_data_cell {
                                border-color: #f1f5f9 !important;
                            }
                            
                            /* 태스크 바 높이 조정 */
                            .wx_gantt_task_content {
                                height: 24px !important;
                                min-height: 24px !important;
                            }
                        `}
                    </style>
                    <div style={{ width: "100%", height: "600px" }}>
                        <Gantt
                            tasks={tasks}
                            links={links}
                            scales={scales}
                            config={config}
                            onTaskUpdate={handleTaskUpdate}
                            onTaskDelete={handleTaskDelete}
                            onLinkAdd={handleLinkAdd}
                            onLinkDelete={handleLinkDelete}
                        />
                    </div>
                </div>

                {/* 범례 */}
                <div className="mt-6 bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-3">작업 유형별 색상 범례</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.planning }}></div>
                            <span>프로젝트 기획</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.analysis }}></div>
                            <span>요구사항 분석</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.frontend }}></div>
                            <span>프론트엔드 개발</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.backend }}></div>
                            <span>백엔드 개발</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.database }}></div>
                            <span>데이터베이스 설계</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.testing }}></div>
                            <span>테스팅</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.deployment }}></div>
                            <span>배포 및 런칭</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: taskColors.summary }}></div>
                            <span>요약 작업 (그룹)</span>
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-600 bg-gray-50 p-3 rounded">
                        <strong>사용법:</strong><br/>
                        • 각 작업은 고유한 색상으로 구분됩니다<br/>
                        • 작업을 클릭하여 편집할 수 있습니다<br/>
                        • 드래그하여 일정을 조정할 수 있습니다<br/>
                        • 작업 간 연결선을 그려 의존성을 설정할 수 있습니다<br/>
                        • 진행률에 따라 작업 바 내부의 채움 정도가 달라집니다
                    </div>
                </div>

                {/* 작업 목록 */}
                <div className="mt-6 bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-semibold">작업 목록</h3>
                    </div>
                    <div className="p-4">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2 px-3 font-medium">작업명</th>
                                    <th className="text-left py-2 px-3 font-medium">시작일</th>
                                    <th className="text-left py-2 px-3 font-medium">종료일</th>
                                    <th className="text-left py-2 px-3 font-medium">진행률</th>
                                    <th className="text-left py-2 px-3 font-medium">상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tasks
                                    .filter(task => task.type === "task")
                                    .map(task => (
                                        <tr key={task.id} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-4 h-4 rounded"
                                                        style={{ backgroundColor: task.color }}
                                                    ></div>
                                                    <span>{task.text}</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3 text-sm text-gray-600">
                                                {task.start.toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-3 text-sm text-gray-600">
                                                {task.end.toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-20 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${
                                                                task.progress === 100
                                                                    ? 'bg-green-500'
                                                                    : task.progress > 50
                                                                        ? 'bg-blue-500'
                                                                        : 'bg-orange-500'
                                                            }`}
                                                            style={{ width: `${task.progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm">{task.progress}%</span>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            task.progress === 100
                                                                ? 'bg-green-100 text-green-800'
                                                                : task.progress > 0
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {task.progress === 100
                                                            ? '완료'
                                                            : task.progress > 0
                                                                ? '진행중'
                                                                : '대기중'}
                                                    </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnhancedGantt;