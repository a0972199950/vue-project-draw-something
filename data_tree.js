export const roomsInSelect = {
    room_1: {
        roomId: 1,
        waitingPlayers: 0,
        confirmedPlayers: 0,
        player1: {
            uid: false,
            photo: false
        },
        player2: {
            uid: false,
            photo: false
        }
    },

    room_2: {
        roomId: 2,
        waitingPlayers: 0,
        confirmedPlayers: 0,
        player1: {
            uid: false,
            photo: false
        },
        player2: {
            uid: false,
            photo: false
        }
    },

    room_3: {
        roomId: 3,
        waitingPlayers: 0,
        confirmedPlayers: 0,
        player1: {
            uid: false,
            photo: false
        },
        player2: {
            uid: false,
            photo: false
        }
    },

    room_4: {
        roomId: 4,
        waitingPlayers: 0,
        confirmedPlayers: 0,
        player1: {
            uid: false,
            photo: false
        },
        player2: {
            uid: false,
            photo: false
        }
    }
}

export const canvas = {
    room_1: {
        drawingStatus: "end",
        percentX: 0,
        percentY: 0
    },

    room_2: {
        drawingStatus: "end",
        percentX: 0,
        percentY: 0
    },

    room_3: {
        drawingStatus: "end",
        percentX: 0,
        percentY: 0
    },

    room_4: {
        drawingStatus: "end",
        percentX: 0,
        percentY: 0
    },
}

export const questionbase = [
    {
        id: 1,
        title: "神奇寶貝",
        questions: [             
            { id: 1, title: "超夢", photo: "https://picsum.photos/100/100" }, 
            { id: 2, title: "小磁怪", photo: "https://picsum.photos/100/100" }, 
            { id: 3, title: "鬼斯", photo: "https://picsum.photos/100/100" }, 
            { id: 4, title: "百變怪", photo: "https://picsum.photos/100/100" }, 
            { id: 5, title: "呆呆獸", photo: "https://picsum.photos/100/100" }, 
            { id: 6, title: "卡比獸", photo: "https://picsum.photos/100/100" }, 
            { id: 7, title: "3D龍", photo: "https://picsum.photos/100/100" }, 
            { id: 8, title: "迷唇姊", photo: "https://picsum.photos/100/100" }, 
            { id: 9, title: "噴火龍", photo: "https://picsum.photos/100/100" }, 
            { id: 10, title: "喬伊小姐", photo: "https://picsum.photos/100/100" }, 
            { id: 11, title: "小智", photo: "https://picsum.photos/100/100" }, 
            { id: 12, title: "寶貝球", photo: "https://picsum.photos/100/100" }, 
            { id: 13, title: "飛葉快刀", photo: "https://picsum.photos/100/100" }, 
            { id: 14, title: "傑尼龜", photo: "https://picsum.photos/100/100" }, 
            { id: 15, title: "妙蛙種子", photo: "https://picsum.photos/100/100" }, 
            { id: 16, title: "鯉魚王", photo: "https://picsum.photos/100/100" }, 
            { id: 17, title: "大木博士", photo: "https://picsum.photos/100/100" }, 
            { id: 18, title: "水精靈", photo: "https://picsum.photos/100/100" }, 
            { id: 19, title: "快龍", photo: "https://picsum.photos/100/100" },
            { id: 20, title: "皮卡丘", photo: "https://picsum.photos/100/100" }
        ]
    },

    {
        id: 2,
        title: "水果",
        questions: [             
            { id: 1, title: "葡萄", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%91%A1%E8%90%84.jpg?alt=media&token=78d1d017-5fcd-4084-a1f1-1ee4296d1401" }, 
            { id: 2, title: "香蕉", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E9%A6%99%E8%95%89.jpg?alt=media&token=bc6985a2-bdfd-4af7-aed4-2171c1f20028" }, 
            { id: 3, title: "西瓜", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%A5%BF%E7%93%9C.jpg?alt=media&token=5350decc-3010-44f7-b67e-09c5e6c58b84" }, 
            { id: 4, title: "芭樂", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%8A%AD%E6%A8%82.jpg?alt=media&token=be0945d0-01d5-4676-acfe-3ab0f578d893" }, 
            { id: 5, title: "草莓", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%8D%89%E8%8E%93.jpg?alt=media&token=ce642a1d-8420-44d0-bcd7-49f56eaaecfd" }, 
            { id: 6, title: "榴槤", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%A6%B4%E6%A7%A4.jpg?alt=media&token=c49efa23-49b9-4b97-b26d-c66eaba58fa4" }, 
            { id: 7, title: "橘子", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%A9%98%E5%AD%90.jpg?alt=media&token=24bcdc7c-52ef-4860-9577-dde426d4db1a" }, 
            { id: 8, title: "櫻桃", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%AB%BB%E6%A1%83.jpg?alt=media&token=a5cd7ad0-274d-4c01-87f9-9e41c6a7699c" }, 
            { id: 9, title: "火龍果", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E7%81%AB%E9%BE%8D%E6%9E%9C.jpg?alt=media&token=817fcb37-3f5a-4905-926c-b23307d131fb" }, 
            { id: 10, title: "龍眼", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E9%BE%8D%E7%9C%BC.jpg?alt=media&token=4fc60dc4-44b1-499c-bd6a-d6cf3695c281" }, 
            { id: 11, title: "荔枝", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%8D%94%E6%9E%9D.jpg?alt=media&token=bd9f67c3-63c5-4d0e-b5a2-dacb74e648bd" }, 
            { id: 12, title: "楊桃", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%A5%8A%E6%A1%83.jpg?alt=media&token=a2719c59-8ea3-4e18-89e3-59cfdff9e02f" }, 
            { id: 13, title: "奇異果", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E5%A5%87%E7%95%B0%E6%9E%9C.jpg?alt=media&token=a8782a52-70db-4ab6-b00a-2682d93bb58f" }, 
            { id: 14, title: "桑葚", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%A1%91%E8%91%9A.jpg?alt=media&token=eabcb79c-9a55-4164-b5fe-e7941bc2eb06" }, 
            { id: 15, title: "番茄", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E7%95%AA%E8%8C%84.jpg?alt=media&token=75274edd-a033-40e2-8434-d2a59f8c4e15" }, 
            { id: 16, title: "棗子", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%A3%97%E5%AD%90.jpg?alt=media&token=c847034e-5c70-49c8-acd3-b7ad02585ea3" }, 
            { id: 17, title: "木瓜", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%9C%A8%E7%93%9C.jpg?alt=media&token=b6de9c93-da6d-4856-8722-7f5060843479" }, 
            { id: 18, title: "水蜜桃", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E6%B0%B4%E8%9C%9C%E6%A1%83.jpg?alt=media&token=8b94560e-02ce-4fef-b805-68d3456957b5" }, 
            { id: 19, title: "香瓜", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E9%A6%99%E7%93%9C.jpg?alt=media&token=1674168d-4337-4ebb-9052-2328632f8c90" },
            { id: 20, title: "蘋果", photo: "https://firebasestorage.googleapis.com/v0/b/vue-draw-something.appspot.com/o/%E6%B0%B4%E6%9E%9C%2F%E8%98%8B%E6%9E%9C.jpg?alt=media&token=0575ecc0-c414-48a7-b1b1-fc8743525656" }
        ]
    },

]


export const roomsInGame = {
    room_1: {
        questionbaseId: false,
        questionId: false,
        answerId: false,
        score: 0,
        time: 60,
        readySwitchRole: false
    }
}




