import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Trash2} from "lucide-react";

interface SelectedCell {
    dayIndex: number;
    hour: number;
}

interface Event {
    id: string;
    title: string;
    description: string;
    dayIndex: number;
    startHour: number;
    endHour: number;
    color: string;
}

interface FormData {
    title: string;
    description: string;
    startHour: number;
    endHour: number;
}

interface WeekDayModalProps {
    hours: number[];
    weekDate: any;
    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;
    formData: FormData;
    setFormData: (data: FormData) => void;
    selectedCell: SelectedCell | null;
    editingEvent: Event | null;
    handleSaveEvent: () => void;
    handleDeleteEvent: () => void;
}

const WeekDaysModal = ({
                           hours,
                           weekDate,
                           isModalOpen,
                           setIsModalOpen,
                           formData,
                           setFormData,
                           selectedCell,
                           editingEvent,
                           handleSaveEvent,
                           handleDeleteEvent
                       }: WeekDayModalProps) => {
    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editingEvent ? "일정 수정" : "일정 추가"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-7">
                    <div>
                        <Label className="mb-2 p-2" htmlFor="title">제목</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="일정 제목을 입력하세요"
                        />
                    </div>

                    <div>
                        <Label className="mb-2 p-2" htmlFor="description">설명</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="일정 설명을 입력하세요"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-2 p-1" >시작 시간</Label>
                            <div className="flex gap-2">
                                <select
                                    value={formData.startHour}
                                    onChange={(e) => setFormData({...formData, startHour: Number(e.target.value)})}
                                    className="flex-1 border rounded px-3 py-2"
                                >
                                    {hours.map(h => (
                                        <option key={h} value={h}>{h}시</option>
                                    ))}
                                </select>
                                <select
                                    value={formData.startMinute}
                                    onChange={(e) => setFormData({...formData, startMinute: Number(e.target.value)})}
                                    className="flex-1 border rounded px-3 py-2"
                                >
                                    {[0, 10, 20, 30, 40, 50].map(m => (
                                        <option key={m} value={m}>{m}분</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <Label className="mb-2 p-1">종료 시간</Label>
                            <div className="flex gap-2">
                                <select
                                    value={formData.endHour}
                                    onChange={(e) => setFormData({...formData, endHour: Number(e.target.value)})}
                                    className="flex-1 border rounded px-3 py-2"
                                >
                                    {hours.map(h => (
                                        <option key={h} value={h}>{h}시</option>
                                    ))}
                                    <option value={20}>20시</option>
                                </select>
                                <select
                                    value={formData.endMinute}
                                    onChange={(e) => setFormData({...formData, endMinute: Number(e.target.value)})}
                                    className="flex-1 border rounded px-3 py-2"
                                >
                                    {[0, 10, 20, 30, 40, 50].map(m => (
                                        <option key={m} value={m}>{m}분</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {selectedCell && (

                            <div className="text-sm text-gray-500">
                                선택된 날짜: {weekDate.add(selectedCell.dayIndex, "day").format("YYYY년 MM월 DD일")}
                            </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    {editingEvent && (
                        <Button
                            variant="destructive"
                            onClick={handleDeleteEvent}
                            className="mr-auto"
                        >
                            <Trash2 className="w-4 h-4 mr-2"/>
                            삭제
                        </Button>
                    )}
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        취소
                    </Button>
                    <Button onClick={handleSaveEvent} disabled={!formData.title.trim()}>
                        {editingEvent ? "수정" : "저장"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WeekDaysModal;